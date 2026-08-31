import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { getChallengeById } from "../../services/challengeService";
import { createInvite } from "../../services/inviteSrvice";
import { getParticipants, joinChallenge, updateProgress } from "../../services/participantService";


function ChallengeDetailsPage() {

    document.title = `Challenges`;

    const [challenge, setChallenge] = useState(null);
    const [invitee, setInvitee] = useState("");
    const [showInvite, setShowInvite] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const isParticipant = participants.some(
        (participant) => participant.userId._id === user._id
    );

    useEffect(() => {

        async function loadChallenge() {

            try {
                setLoading(true);
                const response = await getChallengeById(id);
                setChallenge(response);
            }

            catch (err) {
                console.error("Failed to load challenge", err);
                setError(err.response?.data?.message || "Failed to load challenge. Please try again shortly.");
            }

            finally {
                setLoading(false);
            }

        }

        async function loadParticipants() {

            try {
                const response = await getParticipants(id);
                setParticipants(response);
            }

            catch (err) {
                console.error("Failed to load Participants", err);
                setError(err.response?.data?.message || "Failed to load Participants. Please try again shortly.");
            }

            finally {
                setLoading(false);
            }

        }

        loadChallenge();
        loadParticipants();

    }, [id]);

    async function handleInvite() {

        try {
            await createInvite({
                invitee,
                challenge: challenge._id
            });

            setInvitee("");
            setShowInvite(false);
        }

        catch (err) {
            console.error("Failed to send invite", err);
            setError(err.response?.data?.message || "Failed to send invite");
        }

    }

    async function handleUpdateProgress(participant) {

        const newProgress = participant.progress + 1;

        await updateProgress(id, {
            progress: newProgress
        });

        const response = await getParticipants(id);
        setParticipants(response);
    }

    async function handleJoin() {

        try {
            await joinChallenge(id);

            const response = await getParticipants(id)
            setParticipants(response);
        }

        catch (err) {
            console.error("Failed to join challenge", err);
            setError(err.response?.data?.message || "Failed to send invite");
        }
    }


    return (
        <main>

            {challenge
                ? (<>
                    <p>{challenge.isPublic == true
                        ? " Public Challenge"
                        : " Private Challenge"}</p>

                    <p>{challenge.status}</p>
                    <h2>{challenge.description}</h2>
                    <p>{challenge.type}</p>

                    <p>Goal:
                        {challenge.isMeasurable == true
                            ? ` ${challenge.goal}`
                            : " Complete Challenge"}
                    </p>

                    <p>Reward: {challenge.reward}xp</p>

                    <p>{challenge.creator.role == "business"
                        ? `Extra Reward: ${challenge.businessReward}`
                        : " "}
                    </p>

                    <p>Start: {new Date(challenge.startTime).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                    })}</p>

                    <p>End: {new Date(challenge.endTime).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                    })}</p>

                    <p>Challenged by: {challenge.creator.username} [
                        {challenge.creator.role == "admin" || challenge.creator.role == "business"
                            ? challenge.creator.role
                            : `${challenge.creator.points}xp`}]
                    </p>


                    {challenge.creator._id === user._id && !challenge.isPublic && (
                        <div>
                            <button onClick={() => setShowInvite(!showInvite)}>Invite More People</button>

                            {showInvite && (
                                <div>
                                    <input
                                        type="text"
                                        placeholder="Enter user ID"
                                        value={invitee}
                                        onChange={(event) => setInvitee(event.target.value)}
                                    />
                                    <button onClick={handleInvite}>Send</button>
                                </div>
                            )}
                        </div>
                    )}

                    {error && <p className="err">Error: {error}</p>}


                    {challenge.isPublic &&
                        challenge.creator._id !== user._id &&
                        !isParticipant && (
                            <button onClick={handleJoin}> Join</button>
                        )}

                    {error && <p className="err">Error: {error}</p>}


                    <p>Current Participants:</p>
                    {participants.map((participant) => (
                        <div key={participant._id}>
                            <h3>{participant.userId.username}</h3>

                            {participant.isComplete
                                ? (
                                    <p>
                                        ✅ Completed at{" "}
                                        {new Date(participant.completeAt).toLocaleString("en-GB", {
                                            day: "numeric",
                                            month: "long",
                                            year: "numeric",
                                            hour: "numeric",
                                            minute: "2-digit"
                                        })}
                                    </p>
                                )
                                : (
                                    <div>
                                        <p>Progress: {participant.progress}</p>

                                        {participant.userId._id === user._id && (
                                            <button onClick={() => handleUpdateProgress(participant)}>➕</button>
                                        )}
                                    </div>
                                )
                            }
                        </div>
                    ))}

                </>)

                : <p>Loading....</p>
            }

        </main>
    );

}


export default ChallengeDetailsPage;