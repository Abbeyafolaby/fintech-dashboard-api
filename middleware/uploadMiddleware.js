const multer = require('multer');
const path = require('path');
const crypto = require('crypto');

// Image storage configuration
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    cb(null, 'img-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// Video storage configuration
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/videos/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).toString('hex');
    cb(null, 'vid-' + uniqueSuffix + path.extname(file.originalname));
  }
});

// File filters
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed!'), false);
  }
};

const videoFileFilter = (req, file, cb) => {
  const allowedTypes = /mp4|mov/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = file.mimetype.startsWith('video/');

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only video files (mp4, mov) are allowed!'), false);
  }
};

// Create multer upload instances
exports.uploadImage = multer({
  storage: imageStorage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB limit
  }
});

exports.uploadVideo = multer({
  storage: videoStorage,
  fileFilter: videoFileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024 // 20MB limit
  }
});