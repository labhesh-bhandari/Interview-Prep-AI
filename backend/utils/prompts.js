// const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
//     You are an AI trained to generate technical interview questions and answers.

//     Task:
//     - Role: ${role}
//     - Candidate Experience: ${experience} years
//     - Focus Topics: ${topicsToFocus}
//     - Write ${numberOfQuestions} interview questions.
//     - For each question, generate a detailed but beginner-friendly answer.
//     - If the answer needs a code example, add a code block inside.
//     - Keep formatting very clean.
//     - Return a pure JSON array like:
//     [
//         {
//             "question": "Question here ?",
//             "answer": "Answer here."
//         },
//         ...
//     ]
//     Important: Do not add any extra text. Only return valid JSON.
// `);

// const conceptExplanationPrompt = (question) => (`
//     You are an AI trained to generate explanation for a given interview question.

//     Task:

//     - Explain the following interview question and its concept in depth as if you're teaching a beginner.
//     - Question: "${question}"
//     - After the explanation provide a short and clear title that summarizes the concept for the article or page header.
//     - If the explanation includes a code example, provide the code block.
//     - Keep the formatting very clean and clear.
//     - Return the result as a valid JSON object in the following format:

//     {
//         "title": "Short title here",
//         "explanation": "Explanation here"
//     }
//     Important: Do not add any extra text outside the JSON format. Only return valid JSON.
// `);

// module.exports = {questionAnswerPrompt, conceptExplanationPrompt};


const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) => (`
    You are an AI trained to generate technical interview questions and answers.

    Task:
    - Role: ${role}
    - Candidate Experience: ${experience} years
    - Focus Topics: ${topicsToFocus}
    - Write ${numberOfQuestions} interview questions.
    - For each question, generate a detailed but beginner-friendly answer.
    - If the answer needs a code example, add a code block inside.
    - Keep formatting very clean.
    - Return a pure JSON array like:
    [
        {
            "question": "Question here ?",
            "answer": "Answer here."
        },
        ...
    ]
    Important: Do not add any extra text. Only return valid JSON.
`);

const conceptExplanationPrompt = (question) => (`
    You are an AI trained to generate explanation for a given interview question.

    Task:
    - Explain the following interview question and its concept in depth as if you're teaching a beginner.
    - Question: "${question}"
    - After the explanation provide a short and clear title that summarizes the concept for the article or page header.
    - If the explanation includes a code example, provide the code block.
    - Keep the formatting very clean and clear.
    - Return the result as a valid JSON object in the following format:

    {
        "title": "Short title here",
        "explanation": "Explanation here"
    }
    Important: Do not add any extra text outside the JSON format. Only return valid JSON.
`);

const resumeQuestionsPrompt = (resumeText) => (`
    You are an expert technical interviewer. Analyze the following resume and generate exactly 20 high-priority interview questions tailored specifically to the candidate's experience, skills, projects, and background.

    Rules:
    - Every question must be directly tied to something specific in the resume (a technology, project, role, or achievement mentioned).
    - Mix: 60% technical questions, 40% behavioral/situational questions.
    - Vary difficulty: some beginner, some intermediate, some advanced.
    - For each question, write a comprehensive expected answer (2-5 sentences).
    - Return a pure JSON array only. No extra text, no markdown fences.

    Format:
    [
        {
            "question": "Question here ?",
            "answer": "Expected answer here."
        },
        ...
    ]

    Resume:
    ${resumeText}
`);

const quizDistractorsPrompt = (questionsAndAnswers) => (`
    You are a quiz generator. For each question and correct answer pair below, generate exactly 3 plausible but clearly incorrect distractor options for a multiple-choice quiz.

    Rules:
    - Distractors must be related to the topic but factually wrong compared to the correct answer.
    - Keep each distractor under 20 words.
    - Do not repeat the correct answer as a distractor.
    - Return a pure JSON array only. No extra text, no markdown fences.

    Format:
    [
        { "distractors": ["wrong option 1", "wrong option 2", "wrong option 3"] },
        ...one object per question in the same order...
    ]

    Questions:
    ${questionsAndAnswers.map((q, i) => `${i + 1}. Q: ${q.question}\nCorrect Answer: ${q.answer.substring(0, 200)}`).join('\n\n')}
`);

module.exports = { questionAnswerPrompt, conceptExplanationPrompt, resumeQuestionsPrompt, quizDistractorsPrompt };