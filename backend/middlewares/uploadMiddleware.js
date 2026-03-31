// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads/');
//     },
//     filename: (req, file, cb) => {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
//     if(allowedTypes.includes(file.mimetype)){
//         cb(null, true);
//     }
//     else{
//         cb(new Error('Only .jpeg, .jpg and .png files are allowed'), false)
//     }
// }

// const upload = multer({storage, fileFilter});

// module.exports = upload;

const multer = require('multer');

// ── Existing: image upload (disk storage) ──
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const imageFileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only .jpeg, .jpg and .png files are allowed'), false);
    }
};

const upload = multer({ storage: imageStorage, fileFilter: imageFileFilter });

// ── New: resume PDF upload (memory storage — no disk write) ──
const resumeFileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    } else {
        cb(new Error('Only PDF files are allowed'), false);
    }
};

const uploadResume = multer({
    storage: multer.memoryStorage(),
    fileFilter: resumeFileFilter,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = { upload, uploadResume };