import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";


function Navbar() {

    const { logout, user } = useAuth();

    return (
        <nav>

            <Link to="/challenges">Challenges</Link>

            {user
                ? (<>
                    <Link to="/challenges/create">Create Challenge</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <button onClick={logout}>Sign Out</button>
                </>)

                : (<>
                    <Link to="/sign-up">Register</Link>
                    <Link to="/sign-in">Login</Link>
                </>)}

        </nav>
    );
}


export default Navbar;