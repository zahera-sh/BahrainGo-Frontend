import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { ProgressBar, LineWave } from 'react-loader-spinner';
import { getPublicChallenges } from "../../services/challengeService";
import "../../styles/publicChallenge.css";

function PublicChallengePage() {

    document.title = `Explore Challenges`;

    const [publicChallenges, setPublicChallenges] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user } = useAuth();
    const [currentPage, setCurrentPage] = useState(1);
    const challengesPerPage = 5;

    useEffect(() => {

        async function loadPublicChallenges() {

            try {
                setLoading(true);

                const response = await getPublicChallenges();
                const sortedChallenges = [...response].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                setPublicChallenges(sortedChallenges);
            }

            catch (err) {
                console.error("Failed to load challenges", err);
                setError("Failed to load challenges. Please try again shortly.");
            }

            finally {
                setLoading(false);
            }

        }

        loadPublicChallenges();

    }, []);

    if (loading) {
        return (
            <main className="challenge-loading">
                <LineWave visible={true} height="150" width="150" color="#f31919" ariaLabel="line-wave-loading" />
                <p>LOADING CHALLENGES...</p>
            </main>
        )
    }

    if (error) {
        return (
            <main className="challenge-error">
                <div className="error-card">
                    <span className="error-code">ERROR</span>
                    <h1>Something went wrong!</h1>
                    <p>{error}</p>
                    <Link to="/"> ← Back to Homepage </Link>
                </div>
            </main>
        )
    }

    const totalPages = Math.ceil(publicChallenges.length / challengesPerPage);
    const startIndex = (currentPage - 1) * challengesPerPage
    const currentChallenges = publicChallenges.slice(startIndex, startIndex + challengesPerPage);

    return (
        <main className="publicChallengesPage">

            <section className="challenges-header">

                <span className="section-label">BATTLE BOARD</span>
                <h1>Latest Challenges</h1>
                <p>Pick a challenge. Make your move. Earn XP.</p>

            </section>


            <section className="challenge-board">

                <div className="challenge-column">

                    <div className="challenge-list">
                        {currentChallenges.length > 0
                            ? (
                                currentChallenges.map((PChallenge) => (
                                    <div key={PChallenge._id} className="public-challenge-card">
                                        <div className="challenge-card-content">
                                            <span className="challenge-type">{PChallenge.type}</span>

                                            <h2>{PChallenge.description}</h2>

                                            {PChallenge.creator.role === "business" && (
                                                <p className="challenge-creator">🏢 {PChallenge.creator.username}</p>
                                            )}
                                        </div>

                                        <Link to={`/challenges/${PChallenge._id}`} className="challenge-arrow">→</Link>
                                    </div>
                                ))
                            )
                            : (
                                <div className="no-challenges"><p>👻 No challenges yet.</p></div>
                            )}
                    </div>

                    {totalPages > 1 && (
                        <div className="challenge-pagination">

                            <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} >  ← </button>

                            <span>PAGE {currentPage} / {totalPages}</span>

                            <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} >  → </button>

                        </div>
                    )}

                </div>


                <aside className="leaderboard">

                    <div className="leaderboard-header">
                        <span className="section-label">HIGH SCORE</span>
                        <h2>LEADERBOARD</h2>
                    </div>

                    <div className="leaderboard-locked">

                        <div className="leaderboard-list">

                            <div className="leaderboard-player first">
                                <span className="rank"> #1</span>
                                <div className="player-info">
                                    <strong>PLAYER ONE</strong>
                                    <span>1250 XP</span>
                                </div>
                                <span className="trophy">🏆</span>
                            </div>

                            <div className="leaderboard-player">
                                <span className="rank">#2</span>
                                <div className="player-info">
                                    <strong>PLAYER</strong>
                                    <span>980 XP</span>
                                </div>
                            </div>

                            <div className="leaderboard-player">
                                <span className="rank">#3</span>
                                <div className="player-info">
                                    <strong>PLAYER</strong>
                                    <span>850 XP</span>
                                </div>
                            </div>

                            <div className="leaderboard-player">
                                <span className="rank">#4</span>
                                <div className="player-info">
                                    <strong>PLAYER</strong>
                                    <span>720 XP</span>
                                </div>
                            </div>

                            <div className="leaderboard-player">
                                <span className="rank">#5</span>
                                <div className="player-info">
                                    <strong>PLAYER</strong>
                                    <span>650 XP</span>
                                </div>
                            </div>

                        </div>

                        <div className="leaderboard-overlay">
                            <span className="maintenance-icon">⚙</span>
                            <strong>UNDER MAINTENANCE</strong>
                            <p>
                                The leaderboard is getting
                                <br />
                                a little power-up.
                            </p>
                            <span className="maintenance-dots">•••</span>
                        </div>

                    </div>

                </aside>

            </section>


            <section className="business-coming-soon">

                <div className="coming-soon-content">
                    <span className="section-label">REAL WORLD REWARDS</span>
                    <h2>BUSINESS CHALLENGES</h2>
                    <p>
                        Complete challenges. Earn XP.
                        <br />
                        Soon, your rewards will leave the screen.
                    </p>
                    <div className="coming-soon-badge">COMING SOON</div>
                </div>

                <div className="fake-logos">

                    <div className="fake-logo logo-one">XP</div>
                    <div className="fake-logo logo-two">GO!</div>
                    <div className="fake-logo logo-three">★</div>
                    <div className="fake-logo logo-four">BH</div>
                    <div className="fake-logo logo-five">+</div>
                    <div className="fake-logo logo-six">XP</div>
                    <div className="fake-logo logo-seven">◆</div>

                </div>

            </section>

        </main>
    );

}


export default PublicChallengePage;