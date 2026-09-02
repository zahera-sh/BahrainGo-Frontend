import { useEffect, useState } from "react";
import { getChallenges, deleteChallenge } from "../../services/adminService";
import { LineWave } from "react-loader-spinner";
import "../../styles/admin.css";

function AdminChallengesPage() {

    document.title = "Manage Challenges";

    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadChallenges() {

            try {
                setLoading(true);
                const response = await getChallenges();
                setChallenges(response);
            }

            catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Could not load challenges.");
            }

            finally {
                setLoading(false);
            }

        }

        loadChallenges();

    }, []);

    async function handleDelete(id) {

        const confirmed = window.confirm("Are you sure you want to delete this challenge?");

        if (!confirmed) return

        try {
            await deleteChallenge(id);
        }

        catch (err) {
            console.error("Failed to delete challenge", err)
            setError(err.response?.data?.message || "Failed to delete challenge.");
        }

    }

    if (loading) {
        return (
            <div>
                <LineWave visible={true} height="150" width="150" color="#f31919" ariaLabel="line-wave-loading" />
                <p>LOADING...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h1>Something went wrong!</h1>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <main className="admin-page">

            <h1>Manage Challenges</h1>

            {challenges.length === 0
                ? <p>No challenges found.</p>

                : (
                    challenges.map(challenge => (
                        <div className="admin-card" key={challenge._id}>
                            <h2>{challenge._id}</h2>

                            <p>{challenge.description}</p>

                            {challenge.creator && (
                                <p>Created by: {challenge.creator.username}</p>
                            )}

                            <p>Goal: {challenge.goal}</p>
                            <p>Points: {challenge.rewards}</p>

                            <p>
                                Deleted: {challenge.isDeleted ? "Yes" : "No"}
                            </p>

                            {!challenge.isDeleted && (
                                <button onClick={() => handleDelete(challenge._id)}>
                                    Delete Challenge
                                </button>
                            )}
                        </div>
                    ))
                )}

        </main>
    );
}

export default AdminChallengesPage;