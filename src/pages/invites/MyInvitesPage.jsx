import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";
import { getMyInvites, acceptInvite, rejectInvite } from "../../services/inviteSrvice";


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
                setError("Failed to load invites. Please try again shortly.");
            }

            finally {
                setLoading(false);
            }

        }

        loadMyInvites();

    }, []);

    if (loading) {
        return <div className="loading">Loading Invites...</div>;
    }

    if (error) {
        return <div className="err">{error}</div>;
    }

    async function handleAccept(inviteId) {

        try {
            await acceptInvite(inviteId);

            const response = await getMyInvites();
            setMyInvites(response);
        }

        catch (err) {
            console.error("Failed to accept invite", err);
        }
    }

    async function handleReject(inviteId) {

        try {
            await rejectInvite(inviteId);

            const response = await getMyInvites();
            setMyInvites(response);
        }

        catch (err) {
            console.error("Failed to reject invite", err);
        }
    }


    return (
        <main>

            <div>
                <h1>Invitations: </h1>

                {myInvites.map((invite) => (
                    <div key={invite._id}>
                        <h3>{invite.challenge.description}</h3>
                        <p>Challenged by: {invite.inviter.username}</p>

                        <p>Received: {new Date(invite.receivedAt).toLocaleString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}</p>

                        <Link to={`/challenges/${invite.challenge._id}`}>View Challenge</Link>

                        {invite.isAccepted
                            ? <p>✅ Accepted</p>
                            : invite.isRejected
                                ? <p>❌ Rejected</p>
                                : invite.isDropped
                                    ? <p>🚫 Dropped</p>
                                    : (
                                        <>
                                            <button onClick={() => handleAccept(invite._id)}>✅</button>
                                            <button onClick={() => handleReject(invite._id)}>❌</button>
                                        </>
                                    )
                        }
                    </div>
                ))}
            </div>

        </main>
    );

}


export default MyInvitesPage;