import React from "react";
import {
    FaInstagram,
    FaXTwitter,
    FaLinkedin,
    FaGithub
} from "react-icons/fa6";

import "../../styles/infoPages.css";

function About() {

    document.title = "About | Bahrain.Go!";

    return (
        <main className="info-page">

            <div className="info-content">

                <h1>About Bahrain.Go!</h1>

                <h2>Discover Bahrain. Take on the Challenge. 🚀</h2>

                <p>
                    <strong>Bahrain.Go!</strong> is a community-focused challenge
                    platform inspired by the idea of turning everyday activities
                    into something a little more exciting.
                </p>

                <p>
                    Whether you're challenging yourself, competing with friends,
                    discovering new activities, or simply trying something
                    different, Bahrain.Go! brings challenges and friendly
                    competition together in one place.
                </p>


                <h2>What Can You Do?</h2>

                <div className="info-feature">
                    <h3>🏆 Create Challenges</h3>
                    <p>
                        Create your own challenges and invite friends or open
                        them to the community.
                    </p>
                </div>

                <div className="info-feature">
                    <h3>👥 Join the Community</h3>
                    <p>
                        Discover public challenges and participate alongside
                        other users.
                    </p>
                </div>

                <div className="info-feature">
                    <h3>📈 Track Your Progress</h3>
                    <p>
                        Keep track of your progress and add updates as you
                        work toward your goal.
                    </p>
                </div>

                <div className="info-feature">
                    <h3>🎯 Earn XP</h3>
                    <p>
                        Complete challenges and earn experience points as
                        you progress.
                    </p>
                </div>

                <div className="info-feature">
                    <h3>💬 Share Your Journey</h3>
                    <p>
                        Add comments and progress logs to document your
                        challenge experience.
                    </p>
                </div>

                <div className="info-feature">
                    <h3>🚩 Keep It Safe</h3>
                    <p>
                        See something that doesn't belong? Users can report
                        challenges for review.
                    </p>
                </div>


                <h2>Why Bahrain.Go!?</h2>

                <p>
                    Bahrain has plenty to explore, and we wanted to create a
                    platform that encourages people to get involved, try new
                    things, and turn ordinary activities into challenges.
                </p>

                <p>
                    From personal goals to friendly competitions, Bahrain.Go!
                    is built around one simple idea:
                </p>

                <blockquote>
                    <strong>Make doing more a little more fun.</strong>
                </blockquote>


                <div className="demo-notice">

                    <h2>Built as a Demo</h2>

                    <p>
                        Bahrain.Go! is a <strong>student software development
                            project</strong> created to demonstrate modern web
                        development concepts, including authentication,
                        CRUD functionality, APIs, databases, user roles,
                        challenges, participation, and moderation.
                    </p>

                    <p>
                        It is currently a demonstration application and is
                        not an official Bahrain service or commercial platform.
                    </p>

                </div>


                <h2>Follow Bahrain.Go!</h2>

                <p>Come say hi 👋</p>

                <div className="social-icons">

                    <a
                        href="YOUR_INSTAGRAM_URL"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram"
                    >
                        <FaInstagram />
                    </a>

                    <a
                        href="YOUR_X_URL"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="X"
                    >
                        <FaXTwitter />
                    </a>

                    <a
                        href="YOUR_LINKEDIN_URL"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>

                    <a
                        href="YOUR_GITHUB_URL"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </a>

                </div>


                <h2>Get Involved</h2>

                <p>
                    Create a challenge. Join one. Track your progress.
                </p>

                <blockquote>
                    <strong>Your next challenge is waiting. 🇧🇭</strong>
                </blockquote>

            </div>

        </main>
    );
}

export default About;