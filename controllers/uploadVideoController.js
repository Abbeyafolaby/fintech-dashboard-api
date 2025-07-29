const User = require('../models/User');

exports.uploadVideo = async (req, res) => {
try {
if (!req.file) {
    return res.status(400).json({
    success: false,
    error: 'Please upload a video file'
    });
}

res.status(200).json({
    success: true,
    data: {
    videoPath: `/uploads/videos/${req.file.filename}`,
    filename: req.file.filename,
    size: req.file.size
    }
});
} catch (error) {
res.status(500).json({
    success: false,
    error: error.message
});
}
};