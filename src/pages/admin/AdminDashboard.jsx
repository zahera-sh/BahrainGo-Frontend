import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router";
import "../../styles/admin.css";

function AdminDashboard() {

    document.title = `Admin Dashboard`;

    const { user } = useAuth();

    return (
        <main className="admin-page">

            <h1>Admin: {user.username}</h1>

            <Link to="/admin/users">Manage Users</Link>

            <Link to="/admin/challenges">Manage Challenges</Link>

            <Link to="/admin/reports">Manage Reports</Link>

        </main>
    );

}

export default AdminDashboard;