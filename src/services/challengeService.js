import api from "./api";


async function createChallenge(body) {
    const response = await api.post("/challenges", body);
    return response.data
}

async function getPublicChallenges() {
    const response = await api.get("/challenges");
    return response.data
}


export {
    createChallenge,
    getPublicChallenges,
}