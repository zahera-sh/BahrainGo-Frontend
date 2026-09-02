import "../styles/homepage.css";

function Homepage() {

    document.title = `Home`;

    return (
        <main className="homepage">

            <section className="hero">

                <div className="sky"></div>

                <div className="landscape"></div>

                <div className="hero-content">
                    <h1>
                        <span>BAHRAIN</span>.GO!
                    </h1>

                    <p>
                        Explore. Challenge. Connect.
                    </p>

                    <div className="hero-actions">
                        <a href="/challenges">Explore Challenges</a>
                        <a href="/challenges/create">Create Challenge</a>
                    </div>
                </div>

            </section>

        </main>
    );

}

export default Homepage;