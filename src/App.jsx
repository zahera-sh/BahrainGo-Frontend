import { Route, Routes } from "react-router";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminChallengesPage from "./pages/admin/AdminChallengesPage";
import AdminReportsPage from "./pages/admin/AdminReportsPage";
import About from "./pages/legal/About";
import TermsOfService from "./pages/legal/TermsOfService";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import HowToUse from "./pages/legal/HowToUse";

function App() {

    return (
        <div>

            <Navbar />

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/sign-up" element={<SignupPage />} />
                <Route path="/sign-in" element={<SignInPage />} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />

                <Route path="/admin" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute> <AdminUsersPage /> </ProtectedRoute>} />
                <Route path="/admin/challenges" element={<ProtectedRoute> <AdminChallengesPage /> </ProtectedRoute>} />
                <Route path="/admin/reports" element={<ProtectedRoute> <AdminReportsPage /> </ProtectedRoute>} />

                <Route path="/challenges" element={<PublicChallengePage />} />
                <Route path="/challenges/create" element={<ProtectedRoute><CreateChallengePage /></ProtectedRoute>} />
                <Route path="/challenges/my" element={<ProtectedRoute><MyChallengesPage /></ProtectedRoute>} />
                <Route path="/challenges/:id/report" element={<ProtectedRoute><CreateReportPage /></ProtectedRoute>} />
                <Route path="/challenges/:id" element={<ProtectedRoute><ChallengeDetailsPage /></ProtectedRoute>} />
                <Route path="/invites/my" element={<ProtectedRoute><MyInvitesPage /></ProtectedRoute>} />

                <Route path="/about" element={<About />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/how" element={<HowToUse />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>

            <Footer />

        </div >
    );

}

export default App;