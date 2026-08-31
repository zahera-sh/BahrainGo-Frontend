import api from "./api";


async function getMyParticipants() {
    const response = await api.get("/participants/my-participants");
    return response.data
}

async function getParticipants(id) {
    const response = await api.get(`/participants/${id}`);
    return response.data
}

async function updateProgress(id, body) {
    const response = await api.put(`/participants/${id}`, body);
    return response.data
}

async function joinChallenge(id) {
    const response = await api.post(`/participants/${id}`);
    return response.data
}


export {
    getMyParticipants,
    getParticipants,
    updateProgress,
    joinChallenge
}