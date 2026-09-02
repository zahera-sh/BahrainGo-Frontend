import api from "./api";


async function getUsers() {
    const response = await api.get("/admin/users");
    return response.data
}

async function deleteUser(id) {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data
}

async function getChallenges() {
    const response = await api.get("/admin/challenges");
    return response.data
}

async function deleteChallenge(id) {
    const response = await api.delete(`/admin/challenges/${id}`);
    return response.data
}

async function getReports() {
    const response = await api.get("/admin/reports");
    return response.data
}


export {
    getUsers,
    deleteUser,
    getChallenges,
    deleteChallenge,
    getReports
}