const mongoose = require("mongoose");
const Repository = require("../models/repoModel");
const Issue = require("../models/issueModel");
const User = require("../models/userModel");

const createIssue = async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;
    try {
        const issue = new Issue({
            title,
            description,
            repository: id
        });

        await issue.save();

        res.status(201).json(issue);
    } catch (err) {
        console.error("Error during  issue creation:", err);
        res.status(500).send("Server error");
    }
};

const updateIssueById = async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({ error: "Issue not found!" });
        }

        issue.title = title;
        issue.description = description;
        issue.status = status;

        await issue.save();

        res.json({ message: "Issue updated!" }, issue);
    } catch (err) {
        console.error("Error during  issue updation:", err);
        res.status(500).send("Server error");
    }
};

const deleteIssueById = async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findByIdAndDelete(id);

        if (!issue) {
            return res.status(404).json({ error: "Issue not found!" });
        }

        await issue.save();

        res.json({ message: "Issue deleted!" }, issue);
    } catch (err) {
        console.error("Error during  issue deletion:", err);
        res.status(500).send("Server error");
    }
};

const getAllIssues = async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.find({ repository: id });

        if (!issue) {
            return res.status(404).json({ error: "Issues not found!" });
        }

        res.status(200).json(issue);
    } catch (err) {
        console.error("Error during  issue deletion:", err);
        res.status(500).send("Server error");
    }
};

const getIssueById = async (req, res) => {
    const { id } = req.params;
    try {
        const issue = await Issue.findById(id);

        if (!issue) {
            return res.status(404).json({ error: "Issue not found!" });
        }

        res.status(200).json(issue);
    } catch (err) {
        console.error("Error during  issue fetching:", err);
        res.status(500).send("Server error");
    }
};

module.exports = {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssues,
    getIssueById,
};