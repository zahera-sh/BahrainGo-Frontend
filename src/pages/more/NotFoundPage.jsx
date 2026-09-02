import { Link } from "react-router";
import "../../styles/notFound.css";

function NotFoundPage() {

    document.title = "404 | Not Found";

    return (
        <main className="not-found">

            <div className="pacman"></div>

            <div className="dots">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>

            <h1>404</h1>
            <p>Oops! Pac-Man ate this page.</p>

            <div className="notFound-actions">
                <Link to="/"> ← Back to Homepage </Link>
                <Link to="/challenges"> Explore Challenges → </Link>
            </div>

        </main>
    );

}

export default NotFoundPage;