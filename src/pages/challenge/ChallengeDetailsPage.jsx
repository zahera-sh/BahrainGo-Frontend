import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { getChallengeById } from "../../services/challengeService";


function ChallengeDetailsPage() {

    document.title = `Challenges`

    const [challenge, setChallenge] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const { user } = useAuth();

    useEffect(() => {

        async function loadChallenge() {

            try {
                setLoading(true);
                const response = await getChallengeById(id);
                setChallenge(response);
            }

            catch (err) {
                console.error("Failed to load challenge", err);
                setError("Failed to load challenge. Please try again shortly.");
            }

            finally {
                setLoading(false);
            }

        }

        loadChallenge();

    }, []);


    return (
        <main>

            {challenge
                ? (<>
                    <p>{challenge.isPublic == true
                        ? " Public Challenge"
                        : " Private Challenge"}</p>

                    <p>{challenge.status}</p>
                    <h2>{challenge.description}</h2>
                    <p>{challenge.type}</p>

                    <p>Goal:
                        {challenge.isMeasurable == true
                            ? ` ${challenge.goal}`
                            : " Complete Challenge"}
                    </p>

                    <p>Reward: {challenge.reward}xp</p>

                    <p>{challenge.creator.role == "business"
                        ? `Extra Reward: ${challenge.businessReward}`
                        : " "}
                    </p>

                    <p>Start: {new Date(challenge.startTime).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                    })}</p>

                    <p>End: {new Date(challenge.endTime).toLocaleString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit"
                    })}</p>

                    <p>Challenged by: {challenge.creator.username} [
                        {challenge.creator.role == "admin" || challenge.creator.role == "business"
                            ? challenge.creator.role
                            : `${challenge.creator.points}xp`}]
                    </p>

                </>)

                : <p>Loading....</p>
            }

        </main>
    );

}


export default ChallengeDetailsPage;