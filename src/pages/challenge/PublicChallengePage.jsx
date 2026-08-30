import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { getPublicChallenges } from "../../services/challengeService";


function PublicChallengePage() {

    document.title = `Challenges`

    const [publicChallenges, setPublicChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {

        async function loadPublicChallenges() {

            try {
                setLoading(true);
                const response = await getPublicChallenges();
                setPublicChallenges(response);
            }

            catch (err) {
                console.error("Failed to load challenges", err);
                setError("Failed to load challenges. Please try again shortly.");
            }

            finally {
                setLoading(false);
            }

        }

        loadPublicChallenges();

    }, []);

    if (loading) {
        return <div className="loading">Loading Challenges...</div>;
    }

    if (error) {
        return <div className="err">{error}</div>;
    }


    return (
        <main className="publicChallengesPage">

            <h1>View Latest Challenges</h1>

            {publicChallenges.map((PChallenge) => (
                <div key={PChallenge._id}>
                    <h3>{PChallenge.description}</h3>
                    <p>{PChallenge.type}</p>

                    {PChallenge.creator.role == "business" && (
                        <p>Challenged by: {PChallenge.creator.username}</p>)}

                    <Link to={`/challenges/${PChallenge._id}`}>➡️</Link>
                </div>
            ))}

        </main>
    );

}


export default PublicChallengePage;