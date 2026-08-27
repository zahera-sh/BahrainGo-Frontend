import api from "./api";


async function createChallenge(body) {
    const response = await api.post("/challenges", body);
    return response.data
}


export {
    createChallenge,
}