import React from "react";
import "../../styles/infoPages.css";

function HowToUse() {

    document.title = "How To Use | Bahrain.Go!";

    return (
        <main className="info-page">

            <div className="info-content">

                <h1>How to Use Bahrain.Go!</h1>

                <h2>Welcome to Bahrain.Go! 🎯</h2>

                <p>
                    Here's how to get started.
                </p>


                <div className="info-feature">
                    <h3>01. Create Your Account</h3>

                    <p>
                        Sign up with your username, email, and password.
                    </p>

                    <p>
                        Once your account is created, you can sign in and
                        access your dashboard.
                    </p>
                </div>


                <div className="info-feature">
                    <h3>02. Explore Challenges</h3>

                    <p>
                        Head to the <strong>Challenges</strong> page to browse
                        available public challenges.
                    </p>

                    <p>You can open a challenge to see:</p>

                    <ul>
                        <li>The challenge description</li>
                        <li>Challenge type</li>
                        <li>Goal</li>
                        <li>Reward</li>
                        <li>Start and end dates</li>
                        <li>Creator</li>
                        <li>Current participants</li>
                        <li>Participant progress</li>
                    </ul>
                </div>


                <div className="info-feature">
                    <h3>03. Join a Public Challenge</h3>

                    <p>
                        Found something interesting?
                    </p>

                    <p>
                        Open the challenge and select <strong>Join</strong>.
                    </p>

                    <p>
                        Once you've joined, you'll become a participant and
                        can start tracking your progress.
                    </p>
                </div>


                <div className="info-feature">
                    <h3>04. Create Your Own Challenge</h3>

                    <p>
                        Want to make your own?
                    </p>

                    <p>
                        Create a challenge by choosing the type, description,
                        goal, start and end times, visibility, and reward.
                    </p>

                    <p>
                        You can create a public challenge for the community or
                        a private challenge for invited users.
                    </p>
                </div>


                <div className="info-feature">
                    <h3>05. Invite Friends</h3>

                    <p>
                        Private challenges allow the challenge creator to
                        invite other users.
                    </p>

                    <p>
                        Enter their username and send them an invitation.
                    </p>

                    <p>
                        They can then accept or reject the invitation.
                    </p>
                </div>


                <div className="info-feature">
                    <h3>06. Track Your Progress</h3>

                    <p>
                        Once you're participating in a challenge, you'll see
                        your personal <strong>Update Your Progress</strong>
                        panel.
                    </p>

                    <p>
                        Enter the amount you want to add to your current
                        progress.
                    </p>

                    <p>
                        <strong>Current progress: 2,000 steps</strong>
                    </p>

                    <p>
                        You add:
                    </p>

                    <p>
                        <strong>+3,000 steps</strong>
                    </p>

                    <p>
                        Your new progress becomes:
                    </p>

                    <p>
                        <strong>5,000 steps</strong>
                    </p>

                    <p>
                        You can also add a comment to record what you
                        accomplished.
                    </p>
                </div>


                <div className="info-feature">
                    <h3>07. View Participant Progress</h3>

                    <p>
                        Click on a participant's username to see more
                        information about their progress and progress logs.
                    </p>
                </div>


                <div className="info-feature">
                    <h3>08. Complete the Challenge</h3>

                    <p>
                        Reach the challenge goal and your challenge will be
                        marked as completed.
                    </p>

                    <p>
                        🎉 Congratulations!
                    </p>

                    <p>
                        Any applicable XP reward will be added to your account.
                    </p>
                </div>


                <div className="info-feature">
                    <h3>09. Leave a Challenge</h3>

                    <p>
                        Changed your mind?
                    </p>

                    <p>
                        Participants can use <strong>Drop Challenge</strong>
                        to leave a challenge they have joined.
                    </p>

                    <p>
                        Once dropped, you will no longer participate in that
                        challenge.
                    </p>
                </div>


                <div className="info-feature">
                    <h3>10. Report a Challenge</h3>

                    <p>
                        If you believe a challenge violates the platform
                        rules, open the challenge and select
                        <strong> Report Challenge</strong>.
                    </p>

                    <p>
                        Choose a reason and provide details explaining the
                        issue.
                    </p>

                    <p>
                        Please only submit reports in good faith.
                    </p>
                </div>


                <div className="info-feature">
                    <h3>11. Your Dashboard</h3>

                    <p>
                        Your dashboard gives you a central place to see your
                        activity, including your challenges, participation,
                        and account information.
                    </p>
                </div>


                <div className="info-feature">
                    <h3>12. Have Fun!</h3>

                    <p>
                        Bahrain.Go! is all about challenges, progress, and
                        community.
                    </p>

                    <p>
                        Find something interesting.
                    </p>

                    <p>
                        Take the challenge.
                    </p>

                    <blockquote>
                        <strong>Go! 🚀🇧🇭</strong>
                    </blockquote>
                </div>


                <div className="demo-notice">

                    <h2>Important Demo Notice</h2>

                    <p>
                        Bahrain.Go! is currently a
                        <strong> student/demo project</strong>.
                        Features may change, data may be reset, and the
                        platform should not be used to store sensitive or
                        important personal information.
                    </p>

                </div>

            </div>

        </main>
    );
}

export default HowToUse;