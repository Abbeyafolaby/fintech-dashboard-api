const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { uploadProfileImage } = require('../controllers/profileController');
const upload = require('../middleware/upload');

/**
 * @swagger
 * /api/profile/upload-profile:
 *   post:
 *     summary: Upload profile image
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: profile
 *         type: file
 *         required: true
 *         description: Profile image file
 *     responses:
 *       200:
 *         description: Profile image uploaded successfully
 *       400:
 *         description: Invalid file or no file uploaded
 *       401:
 *         description: Not authorized
 */
router.post('/upload-profile', protect, upload.single('profile'), uploadProfileImage);

module.exports = router;