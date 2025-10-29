import API from "./axios"
import {useNavigate} from "react-router-dom"

export const registerUser = async (userData) => {
    try {
        const res = await API.post('/auth/register', userData)
        return res.data
    } catch (error) {
        console.error("Register Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const loginUser = async (userData) => {
    try {
        const res = await API.post('/auth/login', userData)
        return res.data
    } catch (error) {
        console.error("Login Error: ", error.response?.data || error.message)
        throw error;
    }
}

export const logoutUser = async () => {
    const navigate = useNavigate();
    try {
        localStorage.removeItem("token")
        navigate('/login')
    } catch (error) {
        console.error("Logout Error: ", error)
        throw error;
    }
}

export const googleLogin = () => {
    window.location.href = 'http://localhost:3000/api/v1/auth/google'
}