import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import "../styles/navFooter.css";

function Navbar() {

    const { logout, user } = useAuth();

    return (
        <nav>

            <p className="nav-logo"><span className="bahrain">BAHRAIN</span><span className="go">.GO!</span></p>
            <Link to="/">Homepage</Link>
            <Link to="/challenges">Challenges</Link>


            {user && user.role === "user" && (
                <>
                    <Link to="/dashboard">Dashboard</Link>
                </>
            )}

            {user && user.role === "admin" && (
                <>
                    <Link to="/admin">Dashboard</Link>
                </>
            )}

            {!user && (
                <>
                    <Link to="/sign-up">Register</Link>
                    <Link to="/sign-in">Login</Link>
                </>
            )}

            {user && (
                <>
                    <Link to="/challenges/create">Create Challenge</Link>
                    <button onClick={logout}>Sign Out</button>
                </>
            )}

        </nav>
    );

}

export default Navbar;