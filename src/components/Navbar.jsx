import { Link } from "react-router"
import { useAuth } from "../context/AuthContext"


function Navbar() {

    const { logout, user } = useAuth();

    return (
        <nav>
            {user
                ?
                (<>
                    <button onClick={logout}>Sign Out</button>
                </>) :
                (<>
                    <Link to="/sign-up">Register</Link>
                    <Link to="/sign-in">Login</Link>
                </>)}
        </nav>
    );
}


export default Navbar;