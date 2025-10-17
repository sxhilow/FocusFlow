import { UnauthenticatedError } from "../errors/index.js"
import { verifyAuthToken } from "../utils/jwt.js"

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer ')){                            
        throw new UnauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1] // after spliting looking for the second value (the token)

    try {
        const decode = await verifyAuthToken(token)
        
        const { userId, name } = decode
        
        req.user = {userId, name} // access userId on all routes with this middleware
        next() // Allows express to move to the next middleware. 

    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}