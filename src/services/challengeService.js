import api from "./api";


async function createChallenge(body) {
    const response = await api.post("/challenges", body);
    return response.data
}

async function getPublicChallenges() {
    const response = await api.get("/challenges");
    return response.data
}

async function getChallengeById(id) {
    const response = await api.get(`challenges/${id}`);
    return response.data
}

async function getMyChallenges() {
    const response = await api.get("/challenges/my-challenges");
    return response.data
}


export {
    createChallenge,
    getPublicChallenges,
    getChallengeById,
    getMyChallenges,
}