import API from "./axios";

export const fetchUser = async () => {
    try {
        const res = await API.get('/user/')
        return res.data
    } catch (error) {
        console.error("Error Fetching User: ", error.response?.data || error.message)
        throw error;
    }
}

export const updateUser = async (userData) => {
    try {
        const res = await API.patch('/user/', userData)
        return res.data
    } catch (error) {
        console.error("Error Updating User: ", error.response?.data || error.message)
        throw error;
    }
}

export const fetchUserStreak = async () => {
    try {
        const res = await API.get('/user/streak')
        return res.data
    } catch (error) {
        console.error("Error Fetching User Streak: ", error.response?.data || error.message)
        throw error;
    }
}

export const addUserStreak = async () => {
    try {
        const res = await API.post('/user/streak')
        return res.data
    } catch (error) {
        console.error("Error Adding User Streak: ", error.response?.data || error.message)
        throw error;
    }
}

export const updateUserStreak = async (userData) => {
    try {
        const res = await API.patch('/user/streak', userData)
        return res.data
    } catch (error) {
        console.error("Error Adding User Streak: ", error.response?.data || error.message)
        throw error;
    }
}