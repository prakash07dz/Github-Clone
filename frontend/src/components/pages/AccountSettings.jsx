import React, { useState } from "react";

function AccountSettings() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [notifications, setNotifications] = useState(false);
  const [privacy, setPrivacy] = useState("public");

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
    } else {
      alert("Password changed successfully!");
      // Implement the password change logic
    }
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(URL.createObjectURL(e.target.files[0]));
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Implement account deletion logic
      alert("Account deleted.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-gray-800 p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">
          Account Settings
        </h2>

        {/* Profile Picture */}
        <div className="mb-6 flex justify-center relative">
          <div className="relative group">
            <img
              src={profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-gray-300 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <input
              type="file"
              onChange={handleProfilePicChange}
              className="absolute bottom-0 right-0 p-1 bg-gray-800 text-white rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </div>
        </div>

        {/* Change Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
            placeholder="Enter your email"
          />
        </div>

        {/* Change Username */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full p-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
            placeholder="Enter your username"
          />
        </div>

        {/* Change Password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300">
            New Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full p-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
            placeholder="Enter new password"
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300">
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 w-full p-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
            placeholder="Confirm new password"
          />
        </div>
        <button
          onClick={handleChangePassword}
          disabled
          className="w-full cursor-not-allowed py-3 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Change Password
        </button>

        {/* Notification Settings */}
        <div className="mt-6 flex items-center">
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="mr-2"
          />
          <label className="text-sm text-gray-300">Receive Notifications</label>
        </div>

        {/* Privacy Settings */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-300">
            Profile Privacy
          </label>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="mt-1 w-full p-3 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-700 text-white"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>

        {/* Delete Account */}
        <div className="mt-6">
          <button
            onClick={handleDeleteAccount}
            disabled
            className="w-full cursor-not-allowed py-3 px-4 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
