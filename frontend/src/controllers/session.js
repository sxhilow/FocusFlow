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

export const startSession = async (taskId, commitmentData) => {
    try {
        const res = await API.post('/sessions/start', {taskId, commitmentData})
        return res.data
    } catch (error) {
        console.error("Error starting session: ", error.response?.data || error.message)
        throw error;
    }
}

export const stopSession = async (reflectionData) => {
    try {
        const res = await API.post('/sessions/stop', reflectionData)
        return res.data
    } catch (error) {
        console.error("Error stopping session: ", error.response?.data || error.message)
        throw error;
    }
}