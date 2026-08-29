import api from "./api";


async function getMyParticipants() {
    const response = await api.get("/participants/my-participants");
    return response.data
}

async function getParticipants(id) {
    const response = await api.get(`/participants/${id}`);
    return response.data;
}


export {
    getMyParticipants,
    getParticipants,
}