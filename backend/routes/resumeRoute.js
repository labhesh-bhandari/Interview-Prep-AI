const express = require('express');
const { analyzeResume } = require('../controllers/resumeController');
const { protect } = require('../middlewares/authMiddleware');
const { uploadResume } = require('../middlewares/uploadMiddleware');

const router = express.Router();

router.post('/analyze', protect, uploadResume.single('resume'), analyzeResume);

module.exports = router;