import API from "./axios";

export const fetchAllRewards = async () => {
    try {
        const res = await API.get('/reward')
        return res.data
    } catch (error) {
        console.error("Error fetching tasks: ", error.response?.data || error.message)
        throw error;
    }
}

export const redeemReward = async (rewardId) => {
    try {
        const res = await API.post(`/reward/redeem/${rewardId}`)
        return res.data
    } catch (error) {
        console.error("Error redeeming task: ", error.response?.data || error.message)
        throw error;
    }
}