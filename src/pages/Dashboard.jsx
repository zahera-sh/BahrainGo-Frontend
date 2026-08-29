import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";


function Dashboard({ }) {

    document.title = `Dashboard`;

    const { user } = useAuth();


    return (
        <main>

            <h1>Welcome {user.username}</h1>

            <Link to={`/challenges/my`}>See My Challenges</Link>
            <Link to={`/invites/my`}>See My Invitations</Link>

        </main>
    );

}


export default Dashboard;