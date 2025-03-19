const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const mainRouter = require("./routes/main.router");

dotenv.config();

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitRepo } = require("./controllers/commit");
const { pushRepo } = require("./controllers/push");
const { pullRepo } = require("./controllers/pull");
const { revertRepo } = require("./controllers/revert");

yargs(hideBin(process.argv))
    .command("start", "Start a new server", {}, startServer)
    .command("init", "Initialize a new repository", {}, initRepo)
    .command(
        "add <file>",
        "Add a file to the staging area",
        (yargs) => {
            yargs.positional("file", {
                describe: "File to add to the staging area",
                type: "string",
            });
        },
        async (argv) => {
            try {
                await addRepo(argv.file);
            } catch (err) {
                console.error("Error adding file:", err.message);
            }
        }
    )
    .command(
        "commit <message>",
        "Commit the staged files",
        (yargs) => {
            yargs.positional("message", {
                describe: "Commit message",
                type: "string",
            });
        },
        async (argv) => {
            try {
                await commitRepo(argv.message);
            } catch (err) {
                console.error("Error committing files:", err.message);
            }
        }
    )
    .command("push", "Push commits to the remote repository", {}, async () => {
        try {
            await pushRepo();
        } catch (err) {
            console.error("Error pushing commits:", err.message);
        }
    })
    .command("pull", "Pull commits from the remote repository", {}, async () => {
        try {
            await pullRepo();
        } catch (err) {
            console.error("Error pulling commits:", err.message);
        }
    })
    .command(
        "revert <commitID>",
        "Revert to a specific commit",
        (yargs) => {
            yargs.positional("commitID", {
                describe: "The commit ID to revert to",
                type: "string",
            });
        },
        async (argv) => {
            try {
                await revertRepo(argv.commitID);
            } catch (err) {
                console.error("Error reverting commit:", err.message);
            }
        }
    )
    .demandCommand(1, "You need to specify a command")
    .help()
    .argv;

function startServer() {
    const app = express();
    const port = process.env.PORT || 3000;

    // Middleware
    app.use(express.json());

    // CORS configuration
    const allowedOrigins = [
        // "http://localhost:5173", 
        "https://githubclone-soob.onrender.com",
    ];

    app.use(
        cors({
            origin: function (origin, callback) {
                // Allow requests with no origin (like mobile apps or curl requests)
                if (!origin) return callback(null, true);

                if (allowedOrigins.indexOf(origin) === -1) {
                    const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
                    return callback(new Error(msg), false);
                }

                return callback(null, true);
            },
            credentials: true,
        })
    );

    // Handle preflight requests
    app.options("*", cors());

    // Database connection
    const mongoURL = process.env.MONGODB_URL;

    mongoose.connect(mongoURL)
        .then(() => { console.log("Database connected successfully!"); })
        .catch((err) => { console.error("An error occurred while connecting to the database:", err); });

    // Routes
    app.use("/", mainRouter);

    // Socket.io setup
    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: allowedOrigins,
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", (socket) => {
        socket.on("joinRoom", (userID) => {
            let user = userID;
            console.log("=====");
            console.log(user);
            console.log("=====");
            socket.join(userID);
        });
    });

    // Start the server
    httpServer.listen(port, () => {
        console.log(`Server is running at PORT ${port}`);
    });
}