import express from "express"
import { addStreak, getStreak, getUser, updateStreak, updateUserProfile } from "../controller/userController.js"

const router = express.Router()

router.route('/').get(getUser).patch(updateUserProfile)

router.route('/streak').get(getStreak).patch(updateStreak).post(addStreak)


export default router