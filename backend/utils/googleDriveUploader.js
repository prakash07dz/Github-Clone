const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load Google Drive API credentials from the JSON file
const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, '../config/google-drive-service-account.json'), // Correct file path
    scopes: ['https://www.googleapis.com/auth/drive.file']
});

const drive = google.drive({ version: 'v3', auth });

/**
 * Uploads a file to Google Drive
 * @param {string} filePath - Local file path
 * @param {string} fileName - Name of the file
 * @param {string} folderId - Google Drive Folder ID
 * @returns {Promise<string>} - Google Drive file ID
 */
const uploadFileToDrive = async (filePath, fileName, folderId) => {
    const fileMetadata = {
        name: fileName,
        parents: [folderId], // Use dynamic folder ID
    };

    const media = {
        mimeType: 'application/octet-stream',
        body: fs.createReadStream(filePath),
    };

    const response = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id',
    });

    return response.data.id; // Google Drive File ID
};

/**
 * Generates a public URL for a file
 * @param {string} fileId - Google Drive file ID
 * @returns {Promise<string>} - Public file URL
 */
const getFilePublicUrl = async (fileId) => {
    await drive.permissions.create({
        fileId: fileId,
        requestBody: {
            role: 'reader',
            type: 'anyone',
        },
    });

    const result = await drive.files.get({
        fileId: fileId,
        fields: 'webViewLink, webContentLink',
    });

    return result.data.webContentLink; // Public file URL
};

module.exports = { uploadFileToDrive, getFilePublicUrl };
