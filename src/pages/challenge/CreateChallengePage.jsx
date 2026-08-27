import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { createChallenge } from "../../services/challengeService";


function CreateChallengePage() {

    document.title = `Challenge Now`

    const [formData, setFormData] = useState({
        type: "",
        description: "",
        photo: "",
        isMeasurable: false,
        goal: 1,
        startTime: "",
        endTime: "",
        reward: 10,
        businessReward: "",
    });
    const navigate = useNavigate();
    const { user } = useAuth();

    function handleChange(event) {
        const { name, type, value, checked, files } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const createdChallenge = await createChallenge(formData);

        navigate(`/dashboard`);
    }


    return (
        <main className="createChallengePage">

            <div>
                <p>Feeling Brave?</p>
                <h1>Create a Challenge</h1>
            </div>

            <form className="createChallengeForm" onSubmit={handleSubmit}>

                <div className="createChallengeInput">
                    <label htmlFor="type">Type:</label>
                    <select
                        name="type"
                        id="type"
                        onChange={handleChange}
                        value={formData.type}
                        required
                    >
                        <option value="" disabled>Select Challenge Type</option>
                        <option value="Community">Community</option>
                        <option value="Wellness">Wellness</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Bucket List">Bucket List</option>
                        <option value="Exclusive">Exclusive</option>
                        <option value="Local">Local</option>
                        <option value="Food">Food</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Exploration">Exploration</option>
                        <option value="Social">Social</option>
                        <option value="Business">Business</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="createChallengeInput">
                    <label htmlFor="description">Description:</label>
                    <textarea
                        type="text"
                        name="description"
                        id="description"
                        onChange={handleChange}
                        value={formData.description}
                        required
                        minLength={30}
                    />
                </div>

                <div className="createChallengeInput">
                    <label htmlFor="photo">Image:</label>
                    <input
                        type="text"
                        name="photo"
                        id="photo"
                        onChange={handleChange}
                        value={formData.photo}
                    />
                </div>

                <div className="createChallengeInput">
                    <label htmlFor="isMeasurable">Measurable</label>
                    <input
                        type="checkbox"
                        name="isMeasurable"
                        id="isMeasurable"
                        onChange={handleChange}
                        value={formData.isMeasurable}
                    />
                </div>

                <div className="createChallengeInput">
                    <div style={{ display: formData.isMeasurable ? "block" : "none" }}>
                        <label htmlFor="goal">Goal</label>
                        <input
                            type="number"
                            name="goal"
                            id="goal"
                            onChange={handleChange}
                            value={formData.goal}
                        />
                    </div>
                </div>

                <div className="createChallengeInput">
                    <label htmlFor="startTime">Start Time:</label>
                    <input
                        type="datetime-local"
                        name="startTime"
                        id="startTime"
                        onChange={handleChange}
                        value={formData.startTime}
                    />
                </div>

                <div className="createChallengeInput">
                    <label htmlFor="endTime">End Time:</label>
                    <input
                        type="datetime-local"
                        name="endTime"
                        id="endTime"
                        onChange={handleChange}
                        value={formData.endTime}
                    />
                </div>

                <div className="createChallengeInput">
                    <div style={{ display: user.role == "admin" ? "block" : "none" }}>
                        <label htmlFor="reward">Reward</label>
                        <input
                            type="number"
                            name="reward"
                            id="reward"
                            onChange={handleChange}
                            value={formData.reward}
                        />
                    </div>
                </div>

                <div className="createChallengeInput">
                    <div style={{ display: user.role == "business" ? "block" : "none" }}>
                        <label htmlFor="businessReward">Reward</label>
                        <input
                            type="text"
                            name="businessReward"
                            id="businessReward"
                            onChange={handleChange}
                            value={formData.businessReward}
                        />
                    </div>
                </div>

                <div className="createChallengeActions">
                    <button className="createChallengeButton" type="submit">
                        Challenge
                    </button>
                </div>

            </form>

        </main>
    );

}


export default CreateChallengePage;