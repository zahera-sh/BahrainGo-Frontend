import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";
import { ProgressBar, LineWave } from 'react-loader-spinner';
import { getMyInvites, acceptInvite, rejectInvite } from "../../services/inviteSrvice";
import "../../styles/my.css"

function MyInvitesPage() {

    document.title = `Invitations`;

    const { user } = useAuth();
    const [myInvites, setMyInvites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadMyInvites() {

            try {
                setLoading(true);
                const response = await getMyInvites();
                setMyInvites(response);
            }

            catch (err) {
                console.error("Failed to load invites", err);
                setError(err.response?.data?.message || "Failed to load invites. Please try again shortly.");
            }

            finally {
                setLoading(false);
            }

        }

        loadMyInvites();

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

    async function handleAccept(id) {

        try {
            await acceptInvite(id);

            const response = await getMyInvites();
            setMyInvites(response);
        }

        catch (err) {
            console.error("Failed to accept invite", err);
            setError(err.response?.data?.message || "Failed to accept invite");
        }
    }

    async function handleReject(id) {

        try {
            await rejectInvite(id);

            const response = await getMyInvites();
            setMyInvites(response);
        }

        catch (err) {
            console.error("Failed to reject invite", err);
            setError(err.response?.data?.message || "Failed to reject invite");

        }
    }

    return (
        <main className="my-challenges-page invitations-page">

            <section className="my-challenges-column">

                <div className="my-challenges-header">
                    <span className="section-label">INCOMING MISSIONS</span>
                    <h1>Invitations</h1>
                </div>

                {myInvites.map((invite) => (
                    <div className="my-challenge-card invitation-card" key={invite._id}>

                        <div>
                            <span className="challenge-type">{invite.challenge.type}</span>
                            <h3>{invite.challenge.description}</h3>

                            <p>Challenged by: {invite.inviter.username}</p>

                            <p>
                                Received: {new Date(invite.receivedAt).toLocaleString("en-GB", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </p>

                            {invite.isAccepted
                                ? (
                                    <p className="invite-status accepted">✅ Accepted</p>
                                )
                                : invite.isRejected
                                    ? (
                                        <p className="invite-status rejected">❌ Rejected</p>
                                    )
                                    : invite.isDropped
                                        ? (
                                            <p className="invite-status dropped">🚫 Dropped</p>
                                        )
                                        : (
                                            <div className="invite-actions">
                                                <button onClick={() => handleAccept(invite._id)}>✅</button>
                                                <button onClick={() => handleReject(invite._id)}>❌</button>
                                            </div>
                                        )}
                        </div>

                        {invite.isAccepted && (
                            <Link to={`/challenges/${invite.challenge._id}`}>→</Link>
                        )}

                    </div>
                ))}

            </section>

        </main>
    );

}

export default MyInvitesPage;