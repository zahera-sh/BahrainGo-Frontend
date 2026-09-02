import React from "react";
import "../../styles/infoPages.css";

function PrivacyPolicy() {

    document.title = "Privacy Policy | Bahrain.Go!";

    return (
        <main className="info-page">

            <div className="info-content">

                <h1>Privacy Policy</h1>

                <span className="last-updated">
                    LAST UPDATED: SEPTEMBER 2026
                </span>


                <p>
                    Welcome to <strong>Bahrain.Go!</strong>. We respect your
                    privacy and want you to understand how information is
                    handled when you use our platform.
                </p>


                <h2>1. About Bahrain.Go!</h2>

                <p>
                    Bahrain.Go! is a demonstration web application created
                    as part of a software development project. The platform
                    is designed to demonstrate features such as user
                    accounts, challenges, participation, progress tracking,
                    invitations, rewards, and community interaction.
                </p>

                <p>
                    This website is <strong>not currently a commercial
                        service</strong> and should not be considered a
                    production-ready platform.
                </p>


                <h2>2. Information We Collect</h2>

                <p>
                    When you create an account or use Bahrain.Go!, we may
                    collect information such as:
                </p>

                <ul>
                    <li>Username</li>
                    <li>Email address</li>
                    <li>Password information required for authentication</li>
                    <li>User role</li>
                    <li>Challenge participation and progress</li>
                    <li>Challenge invitations</li>
                    <li>Comments or progress logs</li>
                    <li>Reports submitted about challenges</li>
                    <li>Other information you voluntarily provide</li>
                </ul>

                <p>
                    Passwords are intended to be stored securely using
                    password hashing rather than as plain text.
                </p>


                <h2>3. How We Use Information</h2>

                <p>
                    Information collected by Bahrain.Go! may be used to:
                </p>

                <ul>
                    <li>Create and manage user accounts</li>
                    <li>Authenticate users</li>
                    <li>Allow users to participate in challenges</li>
                    <li>Track challenge progress</li>
                    <li>Display usernames and challenge participation</li>
                    <li>Send and manage challenge invitations</li>
                    <li>Process reports and moderation requests</li>
                    <li>Improve the demonstration application</li>
                </ul>


                <h2>4. Information Visibility</h2>

                <p>
                    Some information may be visible to other users as part
                    of the application's functionality.
                </p>

                <p>
                    For example, usernames, challenge participation,
                    progress, and progress logs may be displayed to other
                    participants where appropriate.
                </p>

                <p>
                    Please avoid submitting sensitive, private, or
                    confidential information through the platform.
                </p>


                <h2>5. Third-Party Services</h2>

                <p>
                    The demonstration application may use third-party
                    services for functionality such as hosting, databases,
                    authentication, email, or other technical services.
                </p>

                <p>
                    These services may process information according to
                    their own privacy policies.
                </p>


                <h2>6. Data Security</h2>

                <p>
                    Reasonable technical measures are used within the scope
                    of this demonstration project to protect user information.
                </p>

                <p>
                    However, Bahrain.Go! is a <strong>demo application</strong>
                    and cannot guarantee the security, availability, or
                    permanent storage of information.
                </p>

                <p>
                    Do not use real passwords or submit sensitive personal
                    information.
                </p>


                <h2>7. Data Retention</h2>

                <p>
                    Information may be stored for as long as necessary for
                    the functionality and demonstration of the application.
                </p>

                <p>
                    Because Bahrain.Go! is a demonstration project, stored
                    data may be reset, deleted, modified, or lost without
                    notice.
                </p>


                <h2>8. Children's Privacy</h2>

                <p>
                    Bahrain.Go! is not specifically designed for children.
                    Users should not provide personal information belonging
                    to children through the platform without appropriate
                    permission.
                </p>


                <h2>9. Changes to This Privacy Policy</h2>

                <p>
                    This Privacy Policy may be updated as the Bahrain.Go!
                    project develops.
                </p>

                <p>
                    Any changes will be reflected on this page with an
                    updated date.
                </p>


                <h2>10. Contact</h2>

                <p>
                    If you have questions about this Privacy Policy or the
                    Bahrain.Go! project, please contact the project team
                    through the contact or social media information provided
                    on the website.
                </p>


                <div className="demo-notice">

                    <h2>Demo Disclaimer</h2>

                    <p>
                        <strong>
                            Bahrain.Go! is a demonstration/student project.
                        </strong>
                        It is not currently a commercial service, and
                        information entered into the application should not
                        be considered permanently stored or protected to
                        production-service standards.
                    </p>

                    <p>
                        Please do not submit sensitive personal information.
                    </p>

                </div>

            </div>

        </main>
    );
}

export default PrivacyPolicy;