import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { signIn } from "../services/authService";
import { useAuth } from "../context/AuthContext";


const SignInForm = ({ }) => {

    document.title = `Login`;

    const { setUser } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    function handleChange(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const signedInUser = await signIn(formData);
            setUser(signedInUser);
            navigate("/dashboard");
        }

        catch (err) {
            console.log(`Error: ${err}`);
            setError(err?.response?.data?.message);
        }
    }


    return (
        <main>
            <h1>Welcome Back</h1>
            <p>Login and see what you missed!</p>
            <p className="error">{error}</p>
            <form autoComplete="off" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        autoComplete="off"
                        id="username"
                        value={formData.username}
                        name="username"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        autoComplete="off"
                        id="password"
                        value={formData.password}
                        name="password"
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <button>Sign In</button>
                    <button onClick={() => navigate("/")}>Cancel</button>
                </div>
            </form>
        </main>
    );

}


export default SignInForm;