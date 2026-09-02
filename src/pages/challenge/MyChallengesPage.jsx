import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { ProgressBar, LineWave } from 'react-loader-spinner';
import { getMyChallenges } from "../../services/challengeService";
import { getMyParticipants } from "../../services/participantService";
import "../../styles/my.css"

function MyChallengesPage() {

    document.title = `My Challenges`;

    const [myChallenges, setMyChallenges] = useState([]);
    const [myParticipants, setMyParticipants] = useState([]);
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

        async function loadMyParticipants() {

            try {
                setLoading(true);
                const response = await getMyParticipants();
                setMyParticipants(response);
            }

            catch (err) {
                console.error("Failed to load participants", err);
                setError("Failed to load participants. Please try again shortly.");
            }

            finally {
                setLoading(false);
            }

        }

        loadMyChallenges();
        loadMyParticipants();

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
        <main className="my-challenges-page">

            <section className="my-challenges-column">

                <div className="my-challenges-header">
                    <span className="section-label">PLAYER MISSIONS</span>
                    <h1>Challenges By Me</h1>
                </div>

                {myChallenges.map((challenge) => (
                    <div className="my-challenge-card" key={challenge._id}>
                        <div>
                            <span className="challenge-type">{challenge.type}</span>
                            <h3>{challenge.description}</h3>
                        </div>

                        <Link to={`/challenges/${challenge._id}`}>→</Link>
                    </div>
                ))}

            </section>

            <section className="my-challenges-column">

                <div className="my-challenges-header">
                    <span className="section-label">ACTIVE MISSIONS</span>
                    <h1>Challenges Joined</h1>
                </div>

                {myParticipants
                    .filter((participants) => participants.challengeId.creator._id !== user._id)
                    .map((participants) => (
                        <div className="my-challenge-card" key={participants._id}>
                            <div>
                                <span className="challenge-type">
                                    {participants.challengeId.type}
                                </span>
                                <h3>{participants.challengeId.description}</h3>
                                <p>Creator: {participants.challengeId.creator.username} </p>
                            </div>

                            <Link to={`/challenges/${participants.challengeId._id}`}>→</Link>
                        </div>
                    ))}
            </section>

        </main>
    );
}

export default MyChallengesPage;