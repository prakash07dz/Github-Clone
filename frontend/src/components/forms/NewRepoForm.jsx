import React, { useState } from "react";
import axios from "axios";

const CreateRepository = ({ currentUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    content: "",
    visibility: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    window.location.href = "/";

    try {
      const url = import.meta.env.VITE_BACKEND_URL;
      const response = await axios.post(`${url}/repo/create`, {
        ...formData,
        owner: currentUser,
      });
      setMessage(response.data.message);
      setFormData({ name: "", description: "", content: "", visibility: true });
    } catch (error) {
      console.error("Error creating repository:", error);
      setMessage("Error creating repository. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex justify-center items-center px-4">
      <div className="bg-gray-800 shadow-lg rounded-lg w-full max-w-md p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-100 mb-4">
          Create a New Repository
        </h2>

        {message && (
          <div
            className={`text-center p-2 mb-4 rounded ${
              message.includes("Error")
                ? "bg-red-500 text-red-100"
                : "bg-green-500 text-green-100"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-300 font-medium mb-1"
            >
              Repository Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-1.5 border-gray-600 bg-gray-700 text-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-300 font-medium mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="w-full border-gray-600 bg-gray-700 text-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-gray-300 font-medium mb-1"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="3"
              className="w-full border-gray-600 bg-gray-700 text-gray-100 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="visibility"
              name="visibility"
              checked={formData.visibility}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600 bg-gray-700 rounded"
            />
            <label
              htmlFor="visibility"
              className="ml-2 text-gray-300 font-medium"
            >
              Public Repository
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? "Creating..." : "Create Repository"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateRepository;
