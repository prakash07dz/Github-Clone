import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

const Dashboard = () => {
  const [repositories, setRepositories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestedRepositories, setSuggestedRepositories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      console.error("User ID not found in localStorage");
      return;
    }

    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://github-clone-v5ul.onrender.com/repo/user/${userId}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            console.warn("No repositories found for this user.");
            setRepositories([]);
            return;
          }
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setRepositories(data.repositories || []);
      } catch (err) {
        console.error("Error while fetching repositories", err);
      }
    };

    const fetchSuggestedRepositories = async () => {
      try {
        const response = await fetch(
          `https://github-clone-v5ul.onrender.com/repo/all`
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        const data = await response.json();
        setSuggestedRepositories(data || []);
      } catch (err) {
        console.error("Error while fetching suggested repositories", err);
      }
    };

    fetchRepositories();
    fetchSuggestedRepositories();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setSearchResults(repositories);
    } else {
      const filteredRepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredRepo);
    }
  }, [searchQuery, repositories]);

  return (
    <>
      <Navbar />
      <section className="bg-gray-900 min-h-screen p-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Left Aside */}
          <aside className="md:col-span-3 bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-white mb-4">
              Suggested Repositories
            </h3>
            <div className="space-y-3">
              {(suggestedRepositories || []).map((repo) => (
                <div key={repo._id} className="p-2 bg-gray-700 rounded shadow">
                  <h4 className="text-sm font-medium text-white">
                    {repo.name}
                  </h4>
                  <p className="text-xs text-gray-300">{repo.description}</p>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Section */}
          <main className="md:col-span-6 bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-bold text-white mb-4">
              Your Repositories
            </h2>
            <div className="mb-6">
              <input
                type="text"
                value={searchQuery}
                placeholder="Search repositories..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 border border-gray-600 rounded focus:outline-none focus:ring focus:ring-blue-200 bg-gray-700 text-white"
              />
            </div>
            <div className="space-y-3">
              {(searchResults || []).map((repo) => (
                <div key={repo._id} className="p-3 bg-gray-700 rounded shadow">
                  <h4 className="text-lg font-medium text-white">
                    {repo.name}
                  </h4>
                  <p className="text-sm text-gray-300">{repo.description}</p>
                </div>
              ))}
            </div>
          </main>

          {/* Right Aside */}
          <aside className="md:col-span-3 bg-gray-800 p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-white mb-4">
              Upcoming Events
            </h3>
            <ul className="space-y-3">
              <li className="p-2 bg-gray-700 rounded shadow">
                <p className="text-sm font-medium text-white">
                  AI and Machine Learning Workshop - Jan 18
                </p>
                <p className="text-xs text-gray-300">
                  Explore the latest advancements in AI and ML, with hands-on
                  training sessions.
                </p>
              </li>
              <li className="p-2 bg-gray-700 rounded shadow">
                <p className="text-sm font-medium text-white">
                  Web Development Bootcamp - Feb 10
                </p>
                <p className="text-xs text-gray-300">
                  An intensive bootcamp focused on modern web development
                  technologies, including React and Node.js.
                </p>
              </li>
              <li className="p-2 bg-gray-700 rounded shadow">
                <p className="text-sm font-medium text-white">
                  UX/UI Design Conference - Mar 3
                </p>
                <p className="text-xs text-gray-300">
                  A conference bringing together top designers to discuss
                  trends, tools, and best practices in user experience and
                  interface design.
                </p>
              </li>
              <li className="p-2 bg-gray-700 rounded shadow">
                <p className="text-sm font-medium text-white">
                  Cloud Computing Expo - Apr 12
                </p>
                <p className="text-xs text-gray-300">
                  Learn about the latest cloud technologies and how to optimize
                  your business processes using cloud solutions.
                </p>
              </li>
              <li className="p-2 bg-gray-700 rounded shadow">
                <p className="text-sm font-medium text-white">
                  Cybersecurity Symposium - May 22
                </p>
                <p className="text-xs text-gray-300">
                  Join industry experts to discuss emerging cybersecurity
                  threats and best practices for protecting your digital assets.
                </p>
              </li>
            </ul>
          </aside>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Dashboard;
