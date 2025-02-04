const fs = require("fs").promises;
const path = require("path");
const { uploadFileToDrive } = require('../utils/googleDriveUploader');  // Import the upload function

async function pushRepo() {
    const repoPath = path.resolve(process.cwd(), ".git");
    const remotePath = path.resolve(process.cwd(), "remote-repo");

    const folderId = "1TvxJ12d7e1vVwHQC1uHghMN_pwUoZwZ3";  // The folder ID for Google Drive (you can modify this)

    try {
        // Ensure the remote repository directory exists (not needed if uploading to Google Drive)
        await fs.mkdir(remotePath, { recursive: true });

        // Path to commits in your local Git repository
        const commitsPath = path.join(repoPath, "commits");

        const commitIDs = await fs.readdir(commitsPath);
        for (const commitID of commitIDs) {
            const localCommitPath = path.join(commitsPath, commitID);

            // Check if the commit exists locally
            try {
                await fs.access(localCommitPath); // Check if the commit directory exists
            } catch {
                console.log(`Commit ${commitID} doesn't exist locally.`);
                continue; // Skip if commit does not exist
            }

            // Now upload the commit files to Google Drive (not copying to remote path)
            const commitFiles = await fs.readdir(localCommitPath);
            for (const file of commitFiles) {
                const filePath = path.join(localCommitPath, file);
                const fileId = await uploadFileToDrive(filePath, file, folderId);
                console.log(`📤 Uploaded commit file: ${file} (ID: ${fileId})`);
            }

            console.log(`Pushed commit ${commitID} to Google Drive.`);
        }

        console.log("✅ All commits pushed to Google Drive.");
    } catch (err) {
        console.error("Error while pushing to Google Drive:", err);
    }
}

module.exports = { pushRepo };
