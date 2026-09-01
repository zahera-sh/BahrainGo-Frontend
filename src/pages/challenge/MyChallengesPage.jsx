import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { ProgressBar, LineWave } from 'react-loader-spinner';
import { getMyChallenges } from "../../services/challengeService";
import { getMyParticipants } from "../../services/participantService";


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
        return <div className="loading">
            <LineWave
                visible={true}
                height="150"
                width="150"
                color="red"
                ariaLabel="line-wave-loading"
                wrapperStyle={{}}
                wrapperClass=""
                firstLineColor=""
                middleLineColor=""
                lastLineColor=""
            />
        </div>
    }

    if (error) {
        return <div className="err">{error}</div>
    }


    return (
        <main>

            <div className="myChallenges">
                <h1>Challenges By Me</h1>

                {myChallenges.map((challenge) => (
                    <div key={challenge._id}>
                        <h3>{challenge.description}</h3>
                        <p>{challenge.type}</p>

                        <Link to={`/challenges/${challenge._id}`}>➡️</Link>
                    </div>
                ))}
            </div>

            <div className="myParticipants">
                <h1>Challenges Joined</h1>

                {myParticipants.map((participants) => {
                    if (participants.challengeId.creator._id !== user._id) {
                        return (
                            <div key={participants._id}>
                                <h3>{participants.challengeId.description}</h3>
                                <p>{participants.challengeId.type}</p>
                                <p>Creator: {participants.challengeId.creator.username}</p>

                                <Link to={`/challenges/${participants.challengeId._id}`}>➡️</Link>
                            </div>
                        )
                    }
                })}
            </div>

        </main>
    );
}


export default MyChallengesPage;