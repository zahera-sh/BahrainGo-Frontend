import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { createChallenge } from "../../services/challengeService";
import "../../styles/createChallenge.css"

function CreateChallengePage() {

    document.title = `Challenge Now`

    const [formData, setFormData] = useState({
        type: "",
        description: "",
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
        <main className="create-challenge-page">

            <section className="create-challenge-header">
                <span className="section-label">MISSION CONTROL</span>
                <p>FEELING BRAVE?</p>
                <h1>Create a Challenge</h1>
                <p className="create-challenge-subtitle">Set the challenge. Choose the rules. Let the adventure begin.</p>
            </section>

            <form className="create-challenge-form" onSubmit={handleSubmit}>

                <div className="form-group">
                    <label htmlFor="type"> Challenge Type</label>
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

                <div className="form-group">
                    <label htmlFor="description"> Description </label>
                    <textarea
                        name="description"
                        id="description"
                        placeholder="What is the challenge?"
                        onChange={handleChange}
                        value={formData.description}
                        required
                        minLength={10}
                    />
                    <small>Tell players what they need to accomplish.</small>
                </div>

                <div className="measurable-box">
                    <label htmlFor="isMeasurable">
                        <input
                            type="checkbox"
                            name="isMeasurable"
                            id="isMeasurable"
                            onChange={handleChange}
                            checked={formData.isMeasurable}
                        />
                        <span>This challenge has a measurable goal</span>
                    </label>
                </div>

                {formData.isMeasurable && (
                    <div className="form-group goal-field">
                        <label htmlFor="goal">Goal</label>
                        <input
                            type="number"
                            name="goal"
                            id="goal"
                            min="1"
                            placeholder="e.g. 10"
                            onChange={handleChange}
                            value={formData.goal}
                            required
                        />
                    </div>
                )}

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="startTime">Start Time</label>
                        <input
                            type="datetime-local"
                            name="startTime"
                            id="startTime"
                            onChange={handleChange}
                            value={formData.startTime}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="endTime">End Time</label>
                        <input
                            type="datetime-local"
                            name="endTime"
                            id="endTime"
                            onChange={handleChange}
                            value={formData.endTime}
                        />
                    </div>
                </div>

                {user.role === "admin" && (
                    <div className="form-group special-field">
                        <label htmlFor="reward">⭐ XP Reward</label>
                        <input
                            type="number"
                            name="reward"
                            id="reward"
                            min="0"
                            onChange={handleChange}
                            value={formData.reward}
                        />
                        <small>Set the XP players receive for completing this challenge.</small>
                    </div>
                )}

                {user.role === "business" && (
                    <div className="form-group special-field business-field">
                        <label htmlFor="businessReward">🎁 Business Reward</label>
                        <input
                            type="text"
                            name="businessReward"
                            id="businessReward"
                            placeholder="e.g. 20% off your next meal"
                            onChange={handleChange}
                            value={formData.businessReward}
                        />
                        <small>This reward will be shown to players who complete the challenge.</small>
                    </div>
                )}

                <div className="create-challenge-actions">
                    <button className="btn btn-yellow" type="submit">⚡ CREATE CHALLENGE</button>

                    <button className="btn btn-danger" type="button" onClick={() => navigate("/challenges")}> ✕ CANCEL </button>
                </div>

            </form>

        </main>
    );

}

export default CreateChallengePage;