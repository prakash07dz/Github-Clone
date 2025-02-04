const express = require('express');
const multer = require('multer');
const { uploadFileToDrive } = require('../utils/googleDriveUploader');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Temporary local storage

const GOOGLE_DRIVE_FOLDER_ID = '1TvxJ12d7e1vVwHQC1uHghMN_pwUoZwZ3'; // Replace with actual folder ID

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const fileId = await uploadFileToDrive(req.file.path, req.file.originalname, GOOGLE_DRIVE_FOLDER_ID);
        res.json({ success: true, fileId: fileId });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
