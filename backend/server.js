// require("dotenv").config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const connectDB = require('./config/db');
// const authRoute = require('./routes/authRoute');
// const sessionRoute = require('./routes/sessionRoute');
// const questionRoute = require('./routes/questionRoute');
// const { protect } = require('./middlewares/authMiddleware');
// const { generateInterviewQuestions, generateConceptExplanation } = require("./controllers/aiController");

// const app = express();

// // Middelware to handle cors
// app.use(cors({
//     origin: '*',
//     methods: ['GET', 'PUT', 'POST', 'DELETE'],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

// // Connecting Database
// connectDB();

// // Middleware to parse json 
// app.use(express.json());


// // Routes
// app.use('/api/auth', authRoute);
// app.use('/api/session', sessionRoute);
// app.use('/api/question', questionRoute);

// app.use('/api/ai/generate-questions', protect, generateInterviewQuestions);
// app.use('/api/ai/generate-explanation', protect, generateConceptExplanation);

// // Serve uploads folder
// app.use('/uploads', express.static(path.join(__dirname, "uploads"), {}));

// // Start the server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoute = require('./routes/authRoute');
const sessionRoute = require('./routes/sessionRoute');
const questionRoute = require('./routes/questionRoute');
const resumeRoute = require('./routes/resumeRoute');
const { protect } = require('./middlewares/authMiddleware');
const { generateInterviewQuestions, generateConceptExplanation, generateQuizOptions } = require("./controllers/aiController");

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

connectDB();

app.use(express.json());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/session', sessionRoute);
app.use('/api/question', questionRoute);
app.use('/api/resume', resumeRoute);

app.use('/api/ai/generate-questions', protect, generateInterviewQuestions);
app.use('/api/ai/generate-explanation', protect, generateConceptExplanation);
app.use('/api/ai/generate-quiz-options', protect, generateQuizOptions);

app.use('/uploads', express.static(path.join(__dirname, "uploads"), {}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));