import { useAuth } from "../context/AuthContext";


function Dashboard({ }) {

    const { user } = useAuth();

    
    return (
        <main>

            <h1>Welcome {user.username}</h1>
            
        </main>
    );

}


export default Dashboard;