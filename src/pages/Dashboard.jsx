import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import { ProgressBar, LineWave } from 'react-loader-spinner';
import { getCurrentUser } from "../services/authService";
import "../styles/dashboard.css"

function Dashboard({ }) {

    document.title = `Dashboard`;

    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadProfile() {

            try {
                setLoading(true);
                const response = await getCurrentUser();
                setProfile(response);
            }

            catch (err) {
                console.error("Failed to load profile", err);
                setError("Failed to load profile. Please try again shortly.");
            }

            finally {
                setLoading(false);
            }

        }

        loadProfile();

    }, []);

  if (loading) {
        return (
            <main className="challenge-loading">
                <LineWave visible={true} height="150" width="150" color="#f31919" ariaLabel="line-wave-loading" />
                <p>LOADING CHALLENGES...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="challenge-error">
                <div className="error-card">
                    <span className="error-code">ERROR</span>
                    <h1>Something went wrong!</h1>
                    <p>{error}</p>
                    <Link to="/dashboard"> ← Back to Dashboard </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="dashboard-page">

            <section className="dashboard-header">
                <span className="section-label">PLAYER PROFILE</span>
                <h1>Welcome, {user.username}!</h1>
                <p>Your Bahrain.Go! adventure starts here.</p>
            </section>

            <section className="dashboard-content">

                <div className="profile-card">

                    <div className="profile-photo">
                        <div className="fake-avatar">🧙🏽</div>
                        <span>PLAYER</span>
                    </div>

                    <div className="profile-info">
                        <span className="section-label">YOUR STATS</span>

                        <div className="stat">
                            <span>EMAIL</span>
                            <strong>{profile.email}</strong>
                        </div>

                        <div className="stat">
                            <span>ROLE</span>
                            <strong>{profile.role == "user"
                                ? "PLAYER"
                                : `${profile.role}`
                            }</strong>
                        </div>

                        <div className="stat xp-stat">
                            <span>EXPERIENCE</span>
                            <strong>⭐ {profile.points} XP</strong>
                        </div>

                        <div className="stat">
                            <span>BADGES</span>
                            <strong>{profile.badges}</strong>
                        </div>

                        <div className="stat">
                            <span>PLAYER SINCE</span>
                            <strong>
                                {new Date(profile.createdAt).toLocaleString("en-GB", {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric"
                                })}
                            </strong>
                        </div>

                    </div>

                </div>


                {/* FAKE PROFILE */}
                <div className="locked-profile">

                    <div className="locked-content">

                        <span className="section-label">PLAYER IDENTITY</span>
                        <div className="fake-profile-photo">👾</div>
                        <h2>CLASSIFIED</h2>
                        <p>
                            Your full player profile is currently
                            being upgraded.
                        </p>
                        <div className="fake-profile-stats">
                            <span>LEVEL ???</span>
                            <span>RANK ???</span>
                            <span>STREAK ???</span>
                        </div>
                        <div className="maintenance-badge">🔒 UNDER MAINTENANCE</div>

                    </div>

                </div>

            </section>

            <section className="dashboard-actions">
                <Link to="/challenges/my">← MY CHALLENGES</Link>

                <Link to="/invites/my">MY INVITATIONS →</Link>
            </section>

        </main>
    );

}


export default Dashboard;