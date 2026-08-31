import React from "react";
import { Link } from "react-router";
import "../../styles/notFound.css";


function NotFoundPage() {

    document.title = "404 | Not Found";

    return (
        <main className="notFound">

            <div className="notFound-content">

                <p className="notFound-code">404</p>
                <h1>Challenge Not Found</h1>
                <p> Looks like you've wandered off the map. This page doesn't exist, or it was defeated somewhere along the way.</p>

                <div className="notFound-actions">
                    <Link to="/"> ← Back to Home </Link>
                    <Link to="/challenges"> Explore Challenges → </Link>
                </div>

            </div>

        </main>
    );

}


export default NotFoundPage;