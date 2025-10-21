import User from "../models/userModel.js"
import { updateStreakOnLogin } from './streakController.js'
import { StatusCodes } from 'http-status-codes'

export const getUser = async (req, res) => {
    const user = await User.findById(req.user.userId).select('-password')
    res.status(StatusCodes.OK).json({ user })
}

export const getStreak = async (req, res) => {
    const user = await User.findById(req.user.userId).select('streak')
    if(!user) return res.status(StatusCodes.NOT_FOUND).json({msg: 'User not found'})
    res.status(StatusCodes.OK).json({streak: user.streak})
}

export const addStreak = async (req, res) => {
    const streak = await updateStreakOnLogin(req.user.userId)
    if(!streak) return res.status(StatusCodes.NOT_FOUND).json({msg: 'User not found'})
    res.status(StatusCodes.OK).json({streak})
}

export const updateStreak = async (req, res) => {
    const { current, longest, lastDate } = req.body
    const user = await User.findById(req.user.userId)
    if(!user) return res.status(StatusCodes.NOT_FOUND).json({msg: 'User not found'})

    if (typeof current === 'number') user.streak.current = current
    if (typeof longest === 'number') user.streak.longest = longest
    if (lastDate) user.streak.lastDate = new Date(lastDate)

    await user.save()
    res.status(StatusCodes.OK).json({streak: user.streak})
}

// implemented the update user service...

export const updateUserProfile = async(req, res) => {
    const {userId} = req.user
    const updatesData = req.body

    const updatedUser = await User.findByIdAndUpdate(
        userId, 
        {$set: updatesData},
        {new: true, runValidators: true}
    ).select('-passowrd')

    if (!updatedUser) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
    }

    res.status(StatusCodes.OK).json({user: updatedUser})
}




