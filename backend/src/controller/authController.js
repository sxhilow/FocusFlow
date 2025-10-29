import User from "../models/userModel.js"
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors/index.js'
import { updateStreakOnLogin } from './streakController.js'

export const register = async (req, res) => {

    const {name, email, password} = req.body;

    if (!password) {
        throw new BadRequestError("Password is required")
    }

    let user = await User.findOne({email})

    if(!user){
        user = await User.create({
            name,
            email,
            password
        })
    }else{
        throw new BadRequestError("User already exists")
    }

    const token = user.createJWT()
    // initialize streak on first registration
    try { await updateStreakOnLogin(user._id) } catch (err) { /* non-fatal */ }
    res.status(StatusCodes.CREATED).json({user:{name: user.name} ,token})
}

export const login = async (req,res) => {
    console.log(req.body);
    
    const {email, password} = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide email and password')
    }

    const user = await User.findOne({email}) 

    if(!user){
        throw new UnauthenticatedError('Invalid Credentails')
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentails')
    }

    const token = user.createJWT();

    // update streak after successful login
    try { await updateStreakOnLogin(user._id) } catch (err) { /* don't block login on streak update */ }

    res.status(StatusCodes.OK).json({user:{name: user.name}, token})
}