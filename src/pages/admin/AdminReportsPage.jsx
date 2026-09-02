import { useEffect, useState } from "react";
import { getReports } from "../../services/adminService";
import { solveReport } from "../../services/reportService";
import { LineWave } from "react-loader-spinner";
import "../../styles/admin.css";

function AdminReportsPage() {

    document.title = "Manage Reports";

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        async function loadReports() {

            try {
                setLoading(true);
                const response = await getReports();
                setReports(response);
            }

            catch (err) {
                console.error(err);
                setError(err.response?.data?.message || "Could not load reports.");
            }

            finally {
                setLoading(false);
            }

        }

        loadReports();

    }, []);

    async function handleSolve(id) {

        try {
            const response = await solveReport(id);

            setReports(
                reports.map(report =>
                    report._id === id
                        ? response
                        : report
                )
            )
        }

        catch (err) {
            console.error(err);
        }
    }

    if (loading) {
        return (
            <div>
                <LineWave visible={true} height="150" width="150" color="#f31919" ariaLabel="line-wave-loading" />
                <p>LOADING...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div>
                <h1>Something went wrong!</h1>
                <p>{error}</p>
            </div>
        )
    }

    return (
        <main className="admin-page">

            <h1>Manage Reports</h1>

            {reports.length === 0
                ? <p>No reports found.</p>

                : (
                    reports.map(report => (
                        <div className="admin-card" key={report._id}>

                            <h2>Report</h2>

                            {report.reporter && (
                                <p>Reported by: {report.reporter.username}</p>
                            )}

                            {report.reportedChallenge && (
                                <p>Challenge: {report.reportedChallenge._id}</p>
                            )}

                            {report.complaintType && (
                                <p>Reason: {report.complaintType}</p>
                            )}

                            <p>
                                Status: {report.isSolved ? "Solved" : "Unsolved"}
                            </p>

                            {!report.isSolved && (
                                <button onClick={() => handleSolve(report._id)}>
                                    Solve Report
                                </button>
                            )}

                        </div>
                    ))
                )}

        </main>
    );
}

export default AdminReportsPage;