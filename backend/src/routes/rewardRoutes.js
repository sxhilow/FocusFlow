import express from "express"
import { getAllRewards, redeemReward } from "../controller/rewardController.js"

const router = express.Router()

router.get('/', getAllRewards)
router.post('/redeem/:id', redeemReward)

export default router