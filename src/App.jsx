import React, { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GoogleLogin from "./components/GoogleLogin/GoogleLogin";
import Dashboard from "./pages/DashBoard/Dashboard";
import PageNotFound from "./components/PageNotFound";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar/Navbar";
import Analytics from "./pages/Analytics/Analytics";
import UrlAnalytics from "./pages/UrlAnalytics/UrlAnalytics";
import RefereshHandler from "./components/RefreshHandler";
import TopicsAnalytics from "./pages/TopicAnalytics/TopicAnalytics";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLogin setIsAuthenticated={setIsAuthenticated} />
      </GoogleOAuthProvider>
    );
  };

  return (
    <BrowserRouter>
      <RefereshHandler setIsAuthenticated={setIsAuthenticated} />
      {isAuthenticated ? (
        <Navbar setIsAuthenticated={setIsAuthenticated} />
      ) : null}
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Protected Routes */}
        {isAuthenticated ? (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analytics/:alias" element={<UrlAnalytics />} />
            <Route path="/topic-analytics" element={<TopicsAnalytics />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        {/* Fallback Route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
