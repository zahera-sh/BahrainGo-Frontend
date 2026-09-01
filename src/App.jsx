import { Route, Routes } from "react-router";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useAuth } from "./context/AuthContext";
// import { getCurrentUser, logout } from "./services/authService";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

import Homepage from "./pages/Homepage";
import SignupPage from "./pages/SignupPage";
import SignInPage from "./pages/SigninPage";
import Dashboard from "./pages/Dashboard";
import CreateChallengePage from "./pages/challenge/CreateChallengePage";
import PublicChallengePage from "./pages/challenge/PublicChallengePage";
import ChallengeDetailsPage from "./pages/challenge/ChallengeDetailsPage";
import MyChallengesPage from "./pages/challenge/MyChallengesPage";
import MyInvitesPage from "./pages/invites/MyInvitesPage";
import NotFoundPage from "./pages/more/NotFoundPage";
import CreateReportPage from "./pages/reports/CreateReportPage";


function App() {

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                <Route path="/challenges" element={<PublicChallengePage />} />
                <Route path="/challenges/create" element={<ProtectedRoute><CreateChallengePage /></ProtectedRoute>} />
                <Route path="/challenges/my" element={<ProtectedRoute><MyChallengesPage /></ProtectedRoute>} />
                <Route path="/challenges/:id/report" element={<ProtectedRoute><CreateReportPage /></ProtectedRoute>} />
                <Route path="/challenges/:id" element={<ProtectedRoute><ChallengeDetailsPage /></ProtectedRoute>} />
                <Route path="/invites/my" element={<ProtectedRoute><MyInvitesPage /></ProtectedRoute>} />

                <Route path="*" element={<NotFoundPage />} />

            </Routes>
        </div>
    );
}

export default App;