import React, { useState, useEffect } from "react";
import axios from "axios";

const UserRepo = ({ currentUser }) => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser) {
      setError("User not logged in.");
      setLoading(false);
      return;
    }

    const fetchUserRepositories = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3002/repo/user/${currentUser}`
        );
        setRepositories(response.data.repositories);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching repositories:", err);
        setError("Could not fetch repositories. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserRepositories();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-gray-100">
        <p className="text-lg">Loading repositories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-900 text-gray-100">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Your Repositories</h1>
      {repositories.length === 0 ? (
        <p className="text-center text-gray-400">
          You don't have any repositories yet.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {repositories.map((repo, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                {repo.name}
              </h2>
              <p className="text-gray-300 mb-4">{repo.description}</p>
              <ul className="text-gray-400 text-sm mb-4">
                <span className="font-medium text-gray-200">Files:</span>
                {repo.content.length > 0 ? (
                  repo.content.map((file, i) => (
                    <li key={i} className="ml-4 list-disc">
                      {file}
                    </li>
                  ))
                ) : (
                  <li className="ml-4 list-disc">No files available</li>
                )}
              </ul>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium focus:outline-none focus:ring focus:ring-blue-500">
                View Repository
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserRepo;
