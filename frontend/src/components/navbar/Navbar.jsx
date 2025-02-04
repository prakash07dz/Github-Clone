import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaUser, FaBars, FaPlusCircle } from "react-icons/fa";
import { FaSignOutAlt, FaCog, FaKey, FaBook } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useAuth } from "../../authContext";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { setCurrentUser } = useAuth();

  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  const logoutHandler = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    setCurrentUser(null);

    window.location.href = "/login";
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo Section */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="logo"
            className="h-8 rounded-full"
          />
          <h3 className="text-2xl font-bold">GitHub</h3>
        </Link>

        {/* Navigation Links */}
        <div className="hidden sm:flex items-center space-x-6">
          <Link
            to="/create"
            className="flex items-center space-x-2 text-lg hover:text-gray-400"
          >
            <FaPlusCircle className="text-xl" />
            <span>Create a Repository</span>
          </Link>
          <div onClick={toggleProfileMenu} className="cursor-pointer">
            <FaUser className="text-2xl" />
          </div>
        </div>

        {/* Hamburger Menu Icon (Visible on small screens) */}
        <div className="sm:hidden">
          <button onClick={toggleNav} className="text-white">
            {isNavOpen ? (
              <ImCross className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Links (Toggled on/off by Hamburger Menu) */}
      <div
        className={`${
          isNavOpen ? "block" : "hidden"
        } sm:hidden bg-gray-800 text-white p-4 space-y-4`}
      >
        <div className="flex justify-between items-center space-x-4">
          <Link
            to="/create"
            className="flex items-center space-x-2 text-lg hover:text-gray-400"
          >
            <FaPlusCircle className="text-xl" />
            <span>Create a Repository</span>
          </Link>
          <div onClick={toggleProfileMenu} className="cursor-pointer">
            <FaUser className="text-2xl" />
          </div>
        </div>
      </div>

      {/* Profile Menu (Sliding from the right) */}
      <div
        className={`${
          isProfileMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 bg-gray-800 text-white w-64 h-full p-4 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Profile Menu</h3>
          <button onClick={toggleProfileMenu} className="text-white">
            <ImCross />
          </button>
        </div>
        <ul className="mt-4 space-y-4">
          <li className="flex items-center space-x-2 hover:text-gray-400">
            <FaUser className="text-xl" />
            <Link to="/profile" className="text-lg">
              View Profile
            </Link>
          </li>
          <li className="flex items-center space-x-2 hover:text-gray-400">
            <FaBook className="text-xl" />
            <Link to="/repositories" className="text-lg">
              Your Repositories
            </Link>
          </li>
          <li className="flex items-center space-x-2 hover:text-gray-400">
            <FaCog className="text-xl" />
            <Link to="/settings" className="text-lg">
              Account Settings
            </Link>
          </li>
          <li className="flex items-center space-x-2 hover:text-gray-400">
            <FaKey className="text-xl" />
            <Link to="/change-password" className="text-lg">
              Change Password
            </Link>
          </li>
          <li className="flex items-center space-x-2 hover:text-gray-400">
            <FaSignOutAlt className="text-xl" />
            <button onClick={logoutHandler} className="text-lg">
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
