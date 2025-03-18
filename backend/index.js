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

    // app.use(bodyParser.json());
    app.use(express.json());

    app.use(cors({
        origin: "https://githubclone-soob.onrender.com",
        credentials: true
    }));

    const mongoURL = process.env.MONGODB_URL;

    mongoose.connect(mongoURL)
        .then(() => { console.log("Database connected sucessfully!"); })
        .catch((err) => { console.error("An error accured while connecting database:", err) })

    app.use(cors({ origin: "*" }));
    app.use("/", mainRouter);

    const httpServer = http.createServer(app);
    const io = new Server(httpServer, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
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

    const db = mongoose.connection;
    db.once("open", async () => {
        console.log("CRUD oprations called");
        //CRUD operations here
    });

    httpServer.listen(port, () => {
        console.log(`Server is running at PORT ${port}`);
    });

}