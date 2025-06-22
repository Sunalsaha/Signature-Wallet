import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Outlet,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import InfoPage from './components/Infopage'; // no file extension needed
import SignUp from "./components/signup";
import Login from "./components/login";
import Dashboard from "./components/Dashboard";
import Profile from "./components/profile";
import Transactions from "./components/Transactions";
import AnimatedPage from "./components/AnimatedPage";
import LogoAnimation from "./components/logoanimation";
import Sidebar from "./components/Sidebar";
import Settings from "./components/settings";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* No sidebar routes */}
        <Route
          path="/"
          element={
            <AnimatedPage>
              <InfoPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/Infopage"
          element={
            <AnimatedPage>
              <InfoPage />
            </AnimatedPage>
          }
        />
        <Route
          path="/login"
          element={
            <AnimatedPage>
              <Login />
            </AnimatedPage>
          }
        />
        <Route
          path="/signup"
          element={
            <AnimatedPage>
              <SignUp />
            </AnimatedPage>
          }
        />

        {/* Sidebar layout routes */}
        <Route
          path="/"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 ml-[60px] md:ml-[260px] p-4 transition-all duration-300">
                <Outlet />
              </div>
            </div>
          }
        >
          <Route
            path="dashboard"
            element={
              <AnimatedPage>
                <Dashboard />
              </AnimatedPage>
            }
          />
          <Route
            path="profile"
            element={
              <AnimatedPage>
                <Profile />
              </AnimatedPage>
            }
          />
          <Route
            path="transactions"
            element={
              <AnimatedPage>
                <Transactions />
              </AnimatedPage>
            }
          />
          <Route
            path="settings"
            element={
              <AnimatedPage>
                <Settings />
              </AnimatedPage>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <Router>{showSplash ? <LogoAnimation /> : <AnimatedRoutes />}</Router>;
};

export default App;