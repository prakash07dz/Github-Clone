const fs = require("fs").promises;
const path = require("path");

async function revertRepo(commitID) {
    const repoPath = path.resolve(process.cwd(), ".git");
    const commitsPath = path.join(repoPath, "commits");
    const workingDirectory = process.cwd();

    try {
        const commitPath = path.join(commitsPath, commitID);

        // Check if the commit exists
        try {
            await fs.access(commitPath);
        } catch {
            console.error(`Commit ${commitID} does not exist.`);
            return;
        }

        // Restore files from the commit to the working directory
        const files = await fs.readdir(commitPath);
        for (const file of files) {
            if (file !== "commit.json") {
                await fs.copyFile(
                    path.join(commitPath, file),
                    path.join(workingDirectory, file)
                );
            }
        }
        console.log(`Reverted to commit ${commitID}.`);
    } catch (err) {
        console.error("Error while reverting to a specific commit:", err);
    }
}

module.exports = { revertRepo };
