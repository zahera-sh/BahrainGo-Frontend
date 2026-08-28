import api from "./api";


async function createInvite(body) {
    const response = await api.post("/invites", body);
    return response.data
}

async function getMyInvites() {
    const response = await api.get("/invites");
    return response.data
}


export {
    createInvite,
    getMyInvites
}