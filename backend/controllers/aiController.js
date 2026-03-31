// const { GoogleGenAI } = require('@google/genai');
// const { conceptExplanationPrompt, questionAnswerPrompt } = require('../utils/prompts');

// // const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// const generateInterviewQuestions = async(req, res) => {
//     try{
//         const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
//         const {role, experience, topicsToFocus, numberOfQuestions} = req.body;
//         if(!role || !experience || !topicsToFocus || !numberOfQuestions){
//             return res.status(400).json({message: "Missing required fields !"});
//         }

//         const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: prompt,
//         });

//         let rawText = response.text;

//         // Clean it: Remove ```json and ``` from beginning and end
//         const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();

//         // Now safe to parse 
//         const data = JSON.parse(cleanedText);

//         res.status(200).json(data);
//     }catch(error){
//         res.status(500).json({
//             message: 'Failed to Generate Questions !',
//             error: error.message
//         });
//     }
// }

// const generateConceptExplanation = async(req, res) => {
//     try{
//         const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});
//         const { question } = req.body;
//         if(!question){
//             return res.status(400).json({message: "Missing required fields !"});
//         }

//         const prompt = conceptExplanationPrompt(question);

//         const response = await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents: prompt,
//         });

//         let rawText = response.text;

//         const cleanedText = rawText.replace(/^```json\s*/, "").replace(/```$/, "").trim();

//         const data = JSON.parse(cleanedText);

//         res.status(200).json(data);
//     }catch(error){
//         res.status(500).json({
//             message: 'Failed to Generate Explanation !',
//             error: error.message
//         });
//     }
// }

// module.exports = { generateInterviewQuestions, generateConceptExplanation }






const { GoogleGenAI } = require('@google/genai');
const { conceptExplanationPrompt, questionAnswerPrompt, quizDistractorsPrompt } = require('../utils/prompts');

const generateInterviewQuestions = async (req, res) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
        if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
            return res.status(400).json({ message: "Missing required fields !" });
        }
        const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);
        const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
        const cleanedText = response.text.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        res.status(200).json(JSON.parse(cleanedText));
    } catch (error) {
        res.status(500).json({ message: 'Failed to Generate Questions !', error: error.message });
    }
};

const generateConceptExplanation = async (req, res) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const { question } = req.body;
        if (!question) {
            return res.status(400).json({ message: "Missing required fields !" });
        }
        const prompt = conceptExplanationPrompt(question);
        const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
        const cleanedText = response.text.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        res.status(200).json(JSON.parse(cleanedText));
    } catch (error) {
        res.status(500).json({ message: 'Failed to Generate Explanation !', error: error.message });
    }
};

const generateQuizOptions = async (req, res) => {
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const { questions } = req.body;
        if (!questions || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ message: "Missing required fields !" });
        }
        const prompt = quizDistractorsPrompt(questions);
        const response = await ai.models.generateContent({ model: "gemini-2.5-flash", contents: prompt });
        const cleanedText = response.text.replace(/^```json\s*/, "").replace(/```$/, "").trim();
        res.status(200).json(JSON.parse(cleanedText));
    } catch (error) {
        res.status(500).json({ message: 'Failed to Generate Quiz Options !', error: error.message });
    }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation, generateQuizOptions };

