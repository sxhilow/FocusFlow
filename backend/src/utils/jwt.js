import jwt from "jsonwebtoken";


export const createAuthToken = (payload) => { // payload = user data (user id and name)
    return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_LIFETIME})
} 

export const verifyAuthToken = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

