import React, { useEffect } from "react";
import { useNavigate, useRoutes } from "react-router-dom";

// Pages List
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/user/Profile";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import AboutUs from "./components/pages/AboutUs";
import TermsOfService from "./components/pages/TermsOfService";
import PrivacyPolicy from "./components/pages/PrivacyPolicy";
import ContactForm from "./components/forms/ContactForm";
import CreateRepository from "./components/forms/NewRepoForm";
import UserRepo from "./components/repo/UserRepo";

// Auth Context
import { useAuth } from "./authContext";
import ChangePassword from "./components/forms/ChangePassword";
import AccountSettings from "./components/pages/AccountSettings";

const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    if (
      !userIdFromStorage &&
      !["/login", "/signup"].includes(window.location.pathname)
    ) {
      navigate("/login");
    }

    if (userIdFromStorage && window.location.pathname === "/login") {
      navigate("/");
    }
  }, [currentUser, navigate, setCurrentUser]);

  let element = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/create",
      element: <CreateRepository currentUser={currentUser} />,
    },
    {
      path: "/repositories",
      element: <UserRepo currentUser={currentUser} />,
    },
    {
      path: "/about",
      element: <AboutUs />,
    },
    {
      path: "/terms",
      element: <TermsOfService />,
    },
    {
      path: "/privacy",
      element: <PrivacyPolicy />,
    },
    {
      path: "/contact",
      element: <ContactForm />,
    },
    {
      path: "/change-password",
      element: <ChangePassword />,
    },
    {
      path: "/settings",
      element: <AccountSettings />,
    },
  ]);

  return element;
};

export default ProjectRoutes;
