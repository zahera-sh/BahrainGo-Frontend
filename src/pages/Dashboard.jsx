import { useAuth } from "../context/AuthContext";
import { Link } from "react-router";


function Dashboard({ }) {

    const { user } = useAuth();


    return (
        <main>

            <h1>Welcome {user.username}</h1>

            <Link to={`/challenges/my-challenges`}>See My Challenges</Link>


        </main>
    );

}


export default Dashboard;