const fs = require("fs").promises;
const path = require("path");

async function initRepo() {
    const repoPath = path.resolve(process.cwd(), ".git");
    const commitsPath = path.join(repoPath, "commits");
    const stagingPath = path.join(repoPath, "staging");

    try {
        // Check if .git already exists
        try {
            await fs.access(repoPath);
            console.error("A repository is already initialized in this directory.");
            return;
        } catch {
            console.log("No existing repository found. Proceeding with initialization...");
        }

        // Create necessary directories and configuration
        await fs.mkdir(repoPath, { recursive: true });
        await fs.mkdir(commitsPath, { recursive: true });
        await fs.mkdir(stagingPath, { recursive: true });
        await fs.writeFile(
            path.join(repoPath, "config.json"),
            JSON.stringify({ remotePath: path.resolve(process.cwd(), "remote-repo") }, null, 2)
        );

        console.log("Repository initialized successfully!");
    } catch (err) {
        console.error("Error initializing repository:", err.message);
    }
}

module.exports = { initRepo };
