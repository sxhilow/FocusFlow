import API from "./axios";

export const fetchAllTasks = async () => {
    try {
        const res = await API.get('/task')
        return res.data
    } catch (error) {
        console.error("Error fetching tasks: ", error.response?.data || error.message)
        throw error;
    }
}

export const fetchTask = async (taskId) => {
    try {
        const res = await API.get(`/task/${taskId}`)
        return res.data
    } catch (error) {
        console.error("Error fetching tasks: ", error.response?.data || error.message)
        throw error;
    }
}

export const addTask = async (taskData) => {
    try {
        const res = await API.post('/task', taskData)
        return res.data
    } catch (error) {
        console.error("Error adding tasks: ", error.response?.data || error.message)
        throw error;
    }
}

export const updateTask = async (taskId, taskData) => {
    try {
        const res = await API.patch(`/task/${taskId}`, taskData)
        return res.data
    } catch (error) {
        console.error("Error updating tasks: ", error.response?.data || error.message)
        throw error;
    }
}

export const deleteTask = async (taskId) => {
    try {
        const res = await API.delete(`/task/${taskId}`)
        return res.data
    } catch (error) {
        console.error("Error deleting tasks: ", error.response?.data || error.message)
        throw error;
    }
}


