import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { createReport } from "../../services/reportService";
import "../../styles/createReport.css"

function CreateReportPage() {

    document.title = "Report Challenge";

    const { id } = useParams();
    const navigate = useNavigate();
    const [complaintType, setComplaintType] = useState("");
    const [complaintBody, setComplaintBody] = useState("");
    const [error, setError] = useState(null);

    async function handleSubmit(event) {

        event.preventDefault();

        try {
            await createReport({
                reportedChallenge: id,
                complaintType,
                complaintBody
            })

            alert("Report submitted successfully.");

            navigate(`/challenges/${id}`)
        }

        catch (err) {
            console.error("Failed to submit report", err);
            setError(err.response?.data?.message || "Failed to submit report.")
        }

    }

    return (
        <main className="create-report-page">

            <section className="create-report-header">
                <span className="section-label">SAFETY TERMINAL</span>
                <h1>Report Challenge</h1>
                <p>Something wrong? Let us know what happened.</p>
            </section>

            {error && (
                <div className="report-form-error">⚠ {error}</div>
            )}

            <form className="create-report-form" onSubmit={handleSubmit} >

                <div className="form-group">
                    <label htmlFor="complaintType">Reason</label>
                    <select
                        id="complaintType"
                        value={complaintType}
                        onChange={(event) => setComplaintType(event.target.value)}
                        required
                    >
                        <option value="">Select a reason</option>
                        <option value="Harmful or Dangerous Content">Harmful or Dangerous Content</option>
                        <option value="Harrassment or Hate Speech">Harassment or Hate Speech</option>
                        <option value="Sexual or Inappropriate Content">Sexual or Inappropriate Content</option>
                        <option value="Privacy or Personal Information">Privacy or Personal Information</option>
                        <option value="Fraud or Scam">Fraud or Scam</option>
                        <option value="Reward Not Provided">Reward Not Provided</option>
                        <option value="Reward or Challenge Misrepresentation">Reward or Challenge Misrepresentation</option>
                        <option value="Violation of Terms of Service">Violation of Terms of Service</option>
                        <option value="Spam or Misleading Content">Spam or Misleading Content</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="complaintBody">Details</label>
                    <textarea
                        id="complaintBody"
                        placeholder="Tell us what happened..."
                        value={complaintBody}
                        onChange={(event) => setComplaintBody(event.target.value)}
                        required
                    />
                </div>

                <div className="report-warning">
                    <span>⚠</span>
                    <p>Please only submit reports for genuine concerns. False or abusive reports may be reviewed.</p>
                </div>

                <div className="report-actions">
                    <button type="submit" className="btn btn-yellow" >🚩 SUBMIT REPORT</button>

                    <button type="button" className="btn btn-danger" onClick={() => navigate(`/challenges/${id}`)}>✕ CANCEL</button>
                </div>

            </form>

        </main>
    );
}


export default CreateReportPage;