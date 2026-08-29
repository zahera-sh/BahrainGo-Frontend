import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { getMyChallenges } from "../../services/challengeService";
import { getMyParticipants } from "../../services/participantService";


function MyChallengesPage() {

    document.title = `My Challenges`

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
                const response = await getMyParticipants();
                setMyParticipants(response);
            }

            catch (err) {
                console.error("Failed to load participants", err);
                setError("Failed to load participants. Please try again shortly.");
            }

        }

        loadMyChallenges();
        loadMyParticipants();

    }, []);

    if (loading) {
        return <div className="loading">Loading Challenges...</div>;
    }

    if (error) {
        return <div className="err">{error}</div>;
    }


    return (
        <main>

            <div className="myChallenges">
                <h1>Challenges By Me</h1>

                {myChallenges.map((challenge) => (
                    <div key={challenge._id}>
                        <h3>{challenge.description}</h3>
                        <p>{challenge.type}</p>

                        <Link to={`/challenges/${challenge._id}`}>View Challenge</Link>
                    </div>
                ))}
            </div>

            <div className="myParticipants">
                <h1>Challenges Joined</h1>

                {myParticipants.map((participants) => (
                    <div key={participants._id}>
                        <h3>{participants.challengeId.description}</h3>
                        <p>{participants.challengeId.type}</p>
                        <p>{participants.challengeId.creator}</p>

                        <Link to={`/challenges/${participants.challengeId._id}`}>View Challenge</Link>
                    </div>
                ))}
            </div>

        </main>
    );
}


export default MyChallengesPage;