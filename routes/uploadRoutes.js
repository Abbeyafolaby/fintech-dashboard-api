const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { uploadImage, uploadVideo } = require('../middleware/uploadMiddleware');
const { uploadImage: uploadImageController } = require('../controllers/uploadImageController');
const { uploadVideo: uploadVideoController } = require('../controllers/uploadVideoController');

/**
 * @swagger
 * /api/profile/upload-image:
 *   post:
 *     summary: Upload profile image
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         required: true
 *         description: Image file (jpeg, jpg, png, gif)
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: Invalid file or no file uploaded
 *       401:
 *         description: Not authorized
 */
router.post('/profile/upload-image', protect, uploadImage.single('file'), uploadImageController);

/**
 * @swagger
 * /api/profile/upload-video:
 *   post:
 *     summary: Upload video file
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: video
 *         type: file
 *         required: true
 *         description: Video file (mp4, mov)
 *     responses:
 *       200:
 *         description: Video uploaded successfully
 *       400:
 *         description: Invalid file or no file uploaded
 *       401:
 *         description: Not authorized
 */
router.post('/profile/upload-video', protect, uploadVideo.single('file'), uploadVideoController);

module.exports = router;