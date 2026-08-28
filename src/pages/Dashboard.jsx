import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";
import { getMyInvites } from "../services/inviteSrvice";


function Dashboard({ }) {

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


    return (
        <main>

            <h1>Welcome {user.username}</h1>

            <Link to={`/challenges/my-challenges`}>See My Challenges</Link>

            <div>
                <h1>Invitations: </h1>

                {myInvites.map((invite) => (
                    <div key={invite._id}>
                        <h3>{invite.challenge.description}</h3>
                        <p>Challenged by: {invite.inviter.username}</p>
                    </div>
                ))}
            </div>


        </main>
    );

}


export default Dashboard;