const { GoogleGenAI } = require('@google/genai');
const pdfParse = require('pdf-parse');
console.log('pdfParse:', pdfParse);
const Session = require('../models/Session');
const Question = require('../models/Question');
const { resumeQuestionsPrompt } = require('../utils/prompts');

const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No PDF file uploaded.' });
        }

        // Extract text from PDF buffer
        const pdfData = await pdfParse(req.file.buffer);
        const resumeText = pdfData.text?.trim();

        if (!resumeText || resumeText.length < 100) {
            return res.status(400).json({
                message: 'Could not extract enough text from this PDF. Please ensure it is not a scanned/image-based PDF.'
            });
        }

        // Cap at 3000 chars to stay well within free-tier token limits
        const truncatedResume = resumeText.substring(0, 3000);

        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

        const prompt = resumeQuestionsPrompt(truncatedResume);

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const rawText = response.text;
        const cleanedText = rawText.replace(/^```json\s*/, '').replace(/```$/, '').trim();
        const generatedQuestions = JSON.parse(cleanedText);

        if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
            return res.status(500).json({ message: 'Failed to generate questions from resume. Please try again.' });
        }

        // Try to extract candidate name/role from first non-empty line for session title
        const firstMeaningfulLine = resumeText
            .split('\n')
            .map(l => l.trim())
            .find(l => l.length > 3 && l.length < 80) || 'Resume Analysis';

        // Create session
        const session = await Session.create({
            user: req.user._id,
            role: firstMeaningfulLine,
            experience: 'From resume',
            topicsToFocus: 'Resume-tailored questions',
            description: `Auto-generated from uploaded resume. ${generatedQuestions.length} questions tailored to your background.`,
        });

        // Create questions
        const questionDocs = await Promise.all(
            generatedQuestions.map(async (q) => {
                const question = await Question.create({
                    session: session._id,
                    question: q.question,
                    answer: q.answer,
                });
                return question._id;
            })
        );

        session.questions = questionDocs;
        await session.save();

        res.status(201).json({ success: true, session });

    } catch (error) {
        console.error('Resume analysis error:', error);
        if (error.message?.includes('JSON')) {
            return res.status(500).json({ message: 'AI returned an unexpected format. Please try again.' });
        }
        res.status(500).json({ message: 'Failed to analyze resume.', error: error.message });
    }
};

module.exports = { analyzeResume };