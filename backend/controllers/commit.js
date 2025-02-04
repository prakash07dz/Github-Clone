const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function commitRepo(message) {
    const repoPath = path.resolve(process.cwd(), ".git");
    const stagedPath = path.join(repoPath, "staging");
    const commitPath = path.join(repoPath, "commits");

    try {
        // Check if .git exists
        try {
            await fs.access(repoPath);
        } catch {
            console.error("No repository found. Please run 'init' first.");
            return;
        }

        // Check if staging area is empty
        const files = await fs.readdir(stagedPath);
        if (files.length === 0) {
            console.error("Nothing to commit. Staging area is empty.");
            return;
        }

        // Create commit
        const commitID = uuidv4(); // Generate unique commit ID
        const commitDir = path.join(commitPath, commitID);
        await fs.mkdir(commitDir, { recursive: true });

        for (const file of files) {
            await fs.copyFile(
                path.join(stagedPath, file),
                path.join(commitDir, file) // Move files to commit folder
            );
        }

        await fs.writeFile(
            path.join(commitDir, "commit.json"),
            JSON.stringify({ message, date: new Date().toISOString() }, null, 2)
        );

        // Clean up staging area
        for (const file of files) {
            await fs.unlink(path.join(stagedPath, file));
        }

        console.log(`Commit ${commitID} created with message: "${message}"`);
    } catch (err) {
        console.error("Error while committing files:", err.message);
    }
}

module.exports = { commitRepo };
