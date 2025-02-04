const express = require("express");
const mainRouter = express.Router();

const userRouter = require("./user.router");
const repoRouter = require("./repo.router");
const issueRouter = require("./issue.router");
const uploadRouter = require("./upload.router")

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);
mainRouter.use(uploadRouter);

mainRouter.get("/", (req, res) => {
    res.send("Welcome!");
});


module.exports = mainRouter;