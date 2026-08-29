import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { getChallengeById } from "../../services/challengeService";
import { createInvite } from "../../services/inviteSrvice";
import { getParticipants } from "../../services/participantService";


function ChallengeDetailsPage() {

    document.title = `Challenges`

    const [challenge, setChallenge] = useState(null);
    const [invitee, setInvitee] = useState("");
    const [showInvite, setShowInvite] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { user } = useAuth();

    useEffect(() => {

        async function loadChallenge() {

            try {
                setLoading(true);
                const response = await getChallengeById(id);
                setChallenge(response);
            }

            catch (err) {
                console.error("Failed to load challenge", err);
                setError("Failed to load challenge. Please try again shortly.");
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
                setError("Failed to load Participants. Please try again shortly.");
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


                    {challenge.creator.username === user.username && (
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

                    <p>Current Participants:</p>
                    {participants.map((participant) => (
                        <div key={participant._id}>
                            <h3>{participant.userId.username}</h3>

                            {participant.isComplete
                                ? <p>✅ Completed {new Date(participant.completeAt).toLocaleString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit"
                                })}</p>
                                : <p>Progress: {participant.progress}</p>
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