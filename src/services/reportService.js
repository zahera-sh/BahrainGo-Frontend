import api from "./api";


async function createReport(reportData) {
    const response = await api.post("/reports", reportData);
    return response.data
}

async function getReports() {
    const response = await api.get("/reports");
    return response.data
}

async function solveReport(id) {
    const response = await api.put(`/reports/${id}/solve`);
    return response.data
}


export {
    createReport,
    getReports,
    solveReport
}