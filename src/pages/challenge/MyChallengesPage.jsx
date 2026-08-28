import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { getMyChallenges } from "../../services/challengeService";


function MyChallengesPage() {

    document.title = `My Challenges`

    const [myChallenges, setMyChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();

    useEffect(() => {

        async function loadMyChallenges() {

            try {
                setLoading(true);
                const response = await getMyChallenges();
                setMyChallenges(response);
            }

            catch (err) {
                console.error("Failed to load challenges", err);
                setError("Failed to load challenges. Please try again shortly.");
            }

            finally {
                setLoading(false);
            }

        }

        loadMyChallenges();

    }, []);

    if (loading) {
        return <div className="loading">Loading Challenges...</div>;
    }

    if (error) {
        return <div className="err">{error}</div>;
    }


    return (
        <main className="myChallengesPage">

            <h1>Challenges By Me</h1>

            {myChallenges.map((challenge) => (
                <div key={challenge._id}>
                    <h3>{challenge.description}</h3>
                    <p>{challenge.type}</p>

                    <Link to={`/challenges/${challenge._id}`}>View Challenge</Link>
                </div>
            ))}

        </main>
    );
}


export default MyChallengesPage;