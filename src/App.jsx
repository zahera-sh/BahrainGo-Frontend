import { Route, Routes } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { getCurrentUser, logout } from "./services/authService";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import CreateChallengePage from "./pages/challenge/CreateChallengePage";
import PublicChallengePage from "./pages/challenge/PublicChallengePage";


function App() {

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                <Route path="/challenges/create" element={<ProtectedRoute><CreateChallengePage /></ProtectedRoute>} />
                <Route path="/challenges" element={<PublicChallengePage />} />
            </Routes>
        </div>
    );
}

export default App;