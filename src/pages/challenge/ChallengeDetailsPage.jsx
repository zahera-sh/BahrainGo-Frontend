import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { ProgressBar, LineWave } from 'react-loader-spinner';
import { getChallengeById, deleteChallenge } from "../../services/challengeService";
import { createInvite, dropChallenge } from "../../services/inviteSrvice";
import { getParticipants, joinChallenge, updateProgress } from "../../services/participantService";
import "../../styles/challengeDetails.css";

function ChallengeDetailsPage() {

    document.title = `Challenge Details`;

    const [challenge, setChallenge] = useState(null);
    const [invitee, setInvitee] = useState("");
    const [showInvite, setShowInvite] = useState(false);
    const [participants, setParticipants] = useState([]);
    const [progress, setProgress] = useState("");
    const [comment, setComment] = useState("");
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const isParticipant = participants.some(
        (participant) => participant.userId?._id === user?._id
    );

    const myParticipant = participants.find(
        (participant) => participant.userId?._id === user?._id
    );

    useEffect(() => {

        async function loadData() {

            try {
                setLoading(true);
                setError(null);

                const challengeResponse = await getChallengeById(id);
                setChallenge(challengeResponse);

                const participantsResponse = await getParticipants(id);
                setParticipants(participantsResponse);
            }

            catch (err) {
                console.error("Failed to load challenge", err);
                setError(
                    err.response?.data?.message || "Failed to load challenge. Please try again shortly."
                );
            }

            finally {
                setLoading(false);
            }

        }

        loadData();

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

    async function handleUpdateProgress() {

        try {
            const addedProgress = Number(progress)
            const newProgress = myParticipant.progress + addedProgress

            await updateProgress(id, {
                progress: newProgress,
                comment
            })

            setProgress("")
            setComment("");

            const response = await getParticipants(id);
            setParticipants(response)
        }

        catch (err) {
            console.error("Failed to update progress", err);
            setError(err.response?.data?.message || "Failed to update progress.");
        }

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

    async function handleDropChallenge() {
        const confirmed = window.confirm(
            "Are you sure you want to drop this challenge? This action cannot be undone."
        );

        if (!confirmed) return

        try {
            await dropChallenge(id)

            const response = await getParticipants(id);
            setParticipants(response);

            if (challenge.isPublic) {
                alert("You have dropped this challenge.");
            }

            else {
                navigate("/challenges/my")
            }
        }

        catch (err) {
            console.error("Failed to drop challenge", err);
            setError(err.response?.data?.message || "Failed to drop challenge.")
        }

    }

    async function handleDeleteChallenge() {

        const confirmed = window.confirm(
            "Are you sure you want to delete this challenge? This action cannot be undone."
        );

        if (!confirmed) return

        try {
            await deleteChallenge(id);

            if (challenge.isPublic) {
                alert("Challenge deleted successfully.");
            }

            else {
                navigate("/challenges/my")
            }
        }

        catch (err) {
            console.error("Failed to delete challenge", err)
            setError(err.response?.data?.message || "Failed to delete challenge.");
        }

    }

    if (loading || !challenge) {
        return (
            <main className="challenge-loading">
                <LineWave visible={true} height="150" width="150" color="#f31919" ariaLabel="line-wave-loading" />
                <p>LOADING CHALLENGE...</p>
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
                    <Link to="/challenges"> ← Back to Challenges </Link>
                </div>
            </main>
        )
    }

    const progressPercentage =
        challenge?.isMeasurable && myParticipant
            ? Math.min(
                (myParticipant.progress / challenge.goal) * 100, 100)
            : 0

    return (
        <main className="challenge-page">

            <section className="challenge-hero">
                <div className="challenge-badges">
                    <span className={challenge.isPublic
                        ? "badge public"
                        : "badge private"} >
                        {challenge.isPublic
                            ? "● PUBLIC"
                            : "● PRIVATE"}
                    </span>
                    <span className="badge status">{challenge.status}</span>
                </div>
                <h1>{challenge.description}</h1>
                <p className="challenge-type"> {challenge.type} </p>
            </section>


            <section className="challenge-info">
                <div className="info-card">
                    <span className="info-label">GOAL</span>
                    <strong>
                        {challenge?.isMeasurable
                            ? challenge.goal
                            : "COMPLETE"}
                    </strong>
                </div>
                <div className="info-card">
                    <span className="info-label">REWARD</span>
                    <strong> ⭐ {challenge.reward} XP </strong>
                </div>
                {challenge.creator.role === "business" && (
                    <div className="info-card special-reward">
                        <span className="info-label"> BUSINESS REWARD </span>
                        <strong> 🎁 {challenge.businessReward} </strong>
                    </div>)}
                <div className="info-card">
                    <span className="info-label">START</span>
                    <strong>
                        {new Date(challenge.startTime).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit"
                        })}
                    </strong>
                </div>
                <div className="info-card">
                    <span className="info-label">END</span>
                    <strong>
                        {new Date(challenge.endTime).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit"
                        })} </strong>
                </div>
            </section>


            <section className="creator-card">
                <div>
                    <span className="section-label"> CHALLENGE CREATOR </span>
                    <h2> {challenge.creator.username} </h2>
                </div>
                <div className="creator-info">
                    <span> {challenge.creator.role} </span>
                    {challenge.creator.role === "user" && (
                        <span> {challenge.creator.points} XP </span>
                    )}
                </div>
            </section>


            {challenge.creator._id === user._id && (
                <section className="challenge-actions">
                    {!challenge.isPublic && (
                        <div className="invite-section">
                            <button className="btn btn-yellow" onClick={() => setShowInvite(!showInvite)} >
                                {showInvite
                                    ? "✕ Close Invite"
                                    : "👥 Invite People"}
                            </button>
                            {showInvite && (<div className="invite-box">
                                <input
                                    type="text"
                                    placeholder="Enter username"
                                    value={invitee}
                                    onChange={(event) => setInvitee(event.target.value)} />
                                <button className="btn btn-purple" onClick={handleInvite} > Send Invite → </button>\
                            </div>
                            )}
                        </div>
                    )}
                    <button className="btn btn-danger" onClick={handleDeleteChallenge} > 🗑 Delete Challenge </button>
                </section>
            )}


            {challenge.isPublic && challenge.creator._id !== user._id && !isParticipant && (
                <section className="join-section">
                    <p> Ready to take on this challenge? </p>
                    <button className="btn btn-yellow join-button" onClick={handleJoin} > ⚡ JOIN CHALLENGE </button>
                </section>
            )}

            {myParticipant && !myParticipant.isComplete && (
                <section className="progress-panel">
                    <div className="panel-header">
                        <div>
                            <span className="section-label">YOUR PROGRESS</span>
                            <h2> Keep Going! </h2>
                        </div>
                        <span className="progress-number">

                            {myParticipant.progress} {challenge?.isMeasurable && ` / ${challenge.goal}`} </span>
                    </div>
                    {challenge?.isMeasurable && (
                        <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${progressPercentage}%` }} />
                        </div>
                    )}
                    <div className="progress-form">
                        <input type="number"
                            min="1"
                            placeholder="Add progress"
                            value={progress}
                            onChange={(event) => setProgress(event.target.value)}
                        />

                        <input

                            type="text"
                            placeholder="Add a comment..."
                            value={comment}
                            onChange={(event) => setComment(event.target.value)}
                        />

                        <button className="btn btn-purple" onClick={handleUpdateProgress} > ➕ Update Progress </button>
                    </div>
                    <button className="drop-button" onClick={handleDropChallenge} > Drop Challenge </button>
                </section>
            )}


            <section className="participants-section">
                <div className="participants-header"><div>
                    <span className="section-label"> THE PLAYERS </span>
                    <h2>Current Participants</h2>
                </div>
                    <span className="participant-count">
                        {participants.length}
                    </span>
                </div>
                <div className="participants-grid">
                    {participants.length > 0
                        ? (participants.map((participant) => (
                            <div key={participant._id} className={participant.isComplete
                                ? "participant-card complete"
                                : "participant-card"} >
                                <button className="participant-name" onClick={() => setSelectedParticipant(participant)} >
                                    {participant.userId.username}
                                </button>
                                {participant.isComplete
                                    ? (<span className="complete-badge"> ✓ COMPLETE </span>)
                                    : (<p> Progress:{" "}
                                        <strong> {participant.progress} </strong>
                                        {challenge?.isMeasurable && ` / ${challenge.goal}`}
                                    </p>)}
                            </div>
                        )))
                        : (
                            <div className="no-participants">
                                <p>👻 No participants yet.</p>
                                <span> Be the first to take on the challenge! </span>
                            </div>)}
                </div>
            </section>


            <div className="report-section">
                <Link to={`/challenges/${id}/report`} className="report-link" > ⚠ Report Challenge </Link>
            </div>


            {selectedParticipant && (
                <div className="participant-overlay">
                    <section className="participant-modal">
                        <button className="close-button" onClick={() => setSelectedParticipant(null)} > ✕ </button>
                        <span className="section-label"> PLAYER PROFILE </span>
                        <h2> {selectedParticipant.userId.username} </h2>
                        <div className="modal-progress">
                            <p>Progress</p>
                            <strong> {selectedParticipant.progress} {challenge?.isMeasurable && ` / ${challenge.goal}`} </strong>
                        </div>
                        {selectedParticipant.isComplete && (
                            <p className="completion-time"> ✓ Completed at{" "} {new Date(selectedParticipant.completeAt).toLocaleString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit"
                            })}
                            </p>
                        )}
                        <h3>Progress Log</h3>
                        <div className="progress-logs">
                            {selectedParticipant.logs?.length > 0
                                ? (selectedParticipant.logs.map((log) => (
                                    <div key={log._id} className="progress-log" >
                                        <p> {log.comment || "Progress updated."} </p>
                                        <span>
                                            {new Date(log.createdAt).toLocaleString("en-GB", {
                                                day: "numeric",
                                                month: "short",
                                                year: "numeric",
                                                hour: "numeric",
                                                minute: "2-digit"
                                            })}
                                        </span>
                                    </div>
                                )))
                                : (
                                    <p className="no-logs"> No updates yet. </p>
                                )}
                        </div>
                    </section>
                </div>
            )}
            
        </main>
    );

}


export default ChallengeDetailsPage;