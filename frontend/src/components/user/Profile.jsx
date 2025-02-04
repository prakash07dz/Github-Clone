import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { FaBookOpen, FaStar, FaUserCircle } from "react-icons/fa";
import HeatMapProfile from "./HeatMap";

const Profile = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // State to track active tab

  useEffect(() => {
    const fetchUserDetails = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("User ID not found in localStorage.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3002/userProfile/${userId}`
        );
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setUserDetails(data);
      } catch (err) {
        console.error("Cannot fetch user details: ", err);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Navigation Tabs */}
          <div className="flex justify-center border-b border-gray-700">
            <button
              className={`flex items-center px-4 py-2 ${
                activeTab === "overview"
                  ? "text-white border-red-500"
                  : "text-gray-300 hover:text-white border-transparent hover:border-red-500"
              } border-b-2`}
              onClick={() => setActiveTab("overview")}
            >
              <FaBookOpen className="mr-2" />
              Overview
            </button>
            <button
              className={`flex items-center px-4 py-2 ${
                activeTab === "starred"
                  ? "text-white border-red-500"
                  : "text-gray-300 hover:text-white border-transparent hover:border-red-500"
              } border-b-2`}
              onClick={() => setActiveTab("starred")}
            >
              <FaStar className="mr-2" />
              Starred Repositories
            </button>
          </div>

          {/* Tabs Content */}
          {activeTab === "overview" && (
            <div className="mt-8">
              <div className="flex flex-wrap lg:flex-nowrap gap-8">
                {/* User Info - 35% Width */}
                <div className="bg-gray-800 p-4 rounded-md shadow-md w-full lg:w-1/3">
                  <div className="flex flex-col items-center text-center">
                    <FaUserCircle className="text-gray-400 text-8xl mb-4" />
                    <h1 className="text-2xl font-semibold mb-2">
                      {userDetails?.username || "Username"}
                    </h1>
                    <div className="mt-2 text-sm text-gray-400">
                      <span>{userDetails?.followers || 0} Followers</span>
                      <span className="mx-2">•</span>
                      <span>{userDetails?.following || 0} Following</span>
                    </div>
                  </div>
                </div>

                {/* Heatmap - 65% Width */}
                <div className="bg-gray-800 p-4 rounded-md shadow-md w-full lg:w-2/3">
                  <HeatMapProfile />
                </div>
              </div>
            </div>
          )}

          {activeTab === "starred" && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold">Starred Repositories</h2>
              <p className="text-gray-400 mt-4">No repositories starred yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
