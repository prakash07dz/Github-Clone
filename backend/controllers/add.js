const fs = require("fs").promises;
const path = require("path");

async function addRepo(filePath) {
    const repoPath = path.resolve(process.cwd(), ".git");
    const stagingPath = path.join(repoPath, "staging");

    try {
        // Check if .git exists
        try {
            await fs.access(repoPath);
        } catch {
            console.error("No repository found. Please run 'init' first.");
            return;
        }

        // Check if the file exists
        try {
            await fs.access(filePath);
        } catch {
            console.error(`File "${filePath}" does not exist.`);
            return;
        }

        // Add the file to staging
        await fs.mkdir(stagingPath, { recursive: true });
        const fileName = path.basename(filePath);
        await fs.copyFile(filePath, path.join(stagingPath, fileName));
        console.log(`File "${fileName}" added to the staging area.`);
    } catch (err) {
        console.error("Error while adding file:", err.message);
    }
}

module.exports = { addRepo };
