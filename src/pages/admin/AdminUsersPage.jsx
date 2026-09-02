import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../../services/adminService";
import { LineWave } from "react-loader-spinner";
import "../../styles/admin.css";

function AdminUsersPage() {

    document.title = "Manage Users";

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadUsers() {

            try {
                setLoading(true);
                const response = await getUsers();
                setUsers(response);
            }

            catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Could not load users.");
            }

            finally {
                setLoading(false);
            }

        }

        loadUsers();

    }, []);

    async function handleDelete(id) {

        const confirmed = window.confirm("Are you sure you want to delete this user?");

        if (!confirmed) return

        try {
            await deleteUser(id)
        }

        catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Failed to delete user.");
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

            <h1>Manage Users</h1>

            {users.length === 0
                ? <p>No users found.</p>

                : (
                    users.map(user => (
                        <div className="admin-card" key={user._id}>

                            <h2>{user.username}</h2>

                            <p>Email: {user.email}</p>
                            <p>Role: {user.role}</p>
                            <p>Points: {user.points}</p>

                            <p>
                                Deleted: {user.isDeleted ? "Yes" : "No"}
                            </p>

                            {!user.isDeleted && (
                                <button onClick={() => handleDelete(user._id)}>
                                    Delete User
                                </button>
                            )}

                        </div>
                    ))
                )}

        </main>
    );
}

export default AdminUsersPage;