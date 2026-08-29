import api from "./api";


async function createInvite(body) {
    const response = await api.post("/invites", body);
    return response.data
}

async function getMyInvites() {
    const response = await api.get("/invites");
    return response.data
}

async function acceptInvite(id) {
    const response = await api.put(`/invites/${id}/accept`)
    return response.data
}

async function rejectInvite(id) {
    const response = await api.put(`/invites/${id}/reject`)
    return response.data
}

async function dropChallenge(id) {
    const response = await api.put(`/invites/${id}/drop`)
    return response.data
}


export {
    createInvite,
    getMyInvites,
    acceptInvite,
    rejectInvite,
    dropChallenge
}