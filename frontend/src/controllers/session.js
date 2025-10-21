import API from "./axios";

export const fetchSessions = async () => {
    try {
        const res = await API.get('/sessions')
        return res.data
    } catch (error) {
        console.error("Error fetching sessions: ", error.response?.data || error.message)
        throw error;
    }
}

export const startSession = async () => {
    try {
        const res = await API.post('/sessions/start')
        return res.data
    } catch (error) {
        console.error("Error starting session: ", error.response?.data || error.message)
        throw error;
    }
}

export const stopSession = async () => {
    try {
        const res = await API.post('/sessions/stop')
        return res.data
    } catch (error) {
        console.error("Error stopping session: ", error.response?.data || error.message)
        throw error;
    }
}

export const addSessionCommitment = async (commitmentData) => {
    try {
        const res = await API.post('/sessions/commit', commitmentData)
        return res.data
    } catch (error) {
        console.error("Error adding session commitment: ", error.response?.data || error.message)
        throw error;
    }
}

export const addSessionRelection = async (reflectionData) => {
    try {
        const res = await API.post('/sessions/reflect', reflectionData)
        return res.data
    } catch (error) {
        console.error("Error adding session reflection: ", error.response?.data || error.message)
        throw error;
    }
}