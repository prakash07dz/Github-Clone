const fs = require("fs").promises;
const path = require("path");

async function pullRepo() {
    const repoPath = path.resolve(process.cwd(), ".git");
    const remoteRepoPath = path.resolve(process.cwd(), "remote-repo"); // Path to remote-repo
    const localCommitsPath = path.join(repoPath, "commits");
    const localStagingPath = path.join(repoPath, "staging");

    try {
        // Check if remote-repo exists
        await fs.access(remoteRepoPath);
        console.log("Pulling changes from remote-repo...");

        // Read the commit files from remote-repo
        const remoteCommits = await fs.readdir(remoteRepoPath);
        if (remoteCommits.length === 0) {
            console.log("No new commits in the remote repository.");
            return;
        }

        // Loop through each commit in remote-repo
        for (const commitID of remoteCommits) {
            const remoteCommitDir = path.join(remoteRepoPath, commitID);
            const localCommitDir = path.join(localCommitsPath, commitID);

            // If commit does not exist locally, copy it
            try {
                await fs.access(localCommitDir);
                console.log(`Commit ${commitID} already exists locally.`);
                continue; // Skip if commit already exists locally
            } catch {
                // If commit does not exist locally, copy the files
                await fs.mkdir(localCommitDir, { recursive: true });
                const filesInCommit = await fs.readdir(remoteCommitDir);
                for (const file of filesInCommit) {
                    await fs.copyFile(
                        path.join(remoteCommitDir, file),
                        path.join(localCommitDir, file)
                    );
                    console.log(`File ${file} pulled from remote-repo.`);
                }
            }
        }

        // After pulling commits, bring back the files to staging if needed
        const filesInStaging = await fs.readdir(localStagingPath);
        for (const file of filesInStaging) {
            console.log(`File ${file} is staged for commit.`);
        }

    } catch (err) {
        console.error("Error during pull operation:", err.message);
    }
}

module.exports = { pullRepo };
