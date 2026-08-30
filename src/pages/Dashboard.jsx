import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import { getCurrentUser } from "../services/authService";


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


    return (
        <main>

            <h1>Welcome {user.username}</h1>

            {profile
                ? (
                    <>
                        <p>{profile.email}</p>
                        <p>{profile.role}</p>
                        <p>{profile.points} xp</p>
                        <p>{profile.badges}</p>
                    </>
                )
                : <p>Loading....</p>
            }

            <Link to={`/challenges/my`}>See My Challenges →</Link>
            <Link to={`/invites/my`}>See My Invitations →</Link>

        </main>
    );

}


export default Dashboard;