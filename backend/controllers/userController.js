const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("../models/userModel");

dotenv.config();

// Signup Controller
const signup = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists!" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            username,
            password: hashedPassword,
            email,
        });

        // Save the user in the database
        const savedUser = await newUser.save();

        return res.status(201).json({
            message: "User successfully registered!",
            userId: savedUser._id,
        });
    } catch (err) {
        console.error("Error during signup: ", err.message);
        res.status(500).send("Server error");
    }
};

// Login Controller
const login = async (req, res) => {
    const { password, email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

        res.json({ token, userId: user._id });
    } catch (err) {
        console.error("Error during login:", err.message);
        res.status(500).send("Server error!");
    }
};

// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        console.error("Error during fetching: ", err.message);
        res.status(500).send("Server error");
    }
};

// Get User Profile
const getUserProfile = async (req, res) => {
    const currentId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(currentId)) {
        console.error("Invalid user ID format!");
        return res.status(400).json({ message: "Invalid user ID format!" });
    }

    try {
        const user = await User.findById(currentId);

        if (!user) {
            console.error(`User not found for ID: ${currentId}`);
            return res.status(404).json({ message: "User not found!" });
        }

        res.json(user);
    } catch (err) {
        console.error("Error during fetching:", err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Update User Profile
const updateUserProfile = async (req, res) => {
    const currentId = req.params.id;
    const { email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(currentId)) {
        return res.status(400).json({ message: "Invalid User ID" });
    }

    if (!email && !password) {
        return res.status(400).json({ message: "At least one field (email or password) must be provided." });
    }

    try {
        const updateFields = {};
        if (email) updateFields.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateFields.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            currentId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error during updating: ", err.message);
        res.status(500).send("Server error");
    }
};

// Delete User Profile
const deleteUserProfile = async (req, res) => {
    const currentId = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(currentId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found!" });
        }

        res.json({ message: "User profile deleted!" });
    } catch (err) {
        console.error("Error during deleting: ", err.message);
        res.status(500).send("Server error");
    }
};

const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return res.status(400).json({ error: "Both old and new passwords are required" });
    }

    try {
        // Find the user and verify the password as you already have
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};


module.exports = {
    signup,
    login,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
    deleteUserProfile,
    changePassword,
};
