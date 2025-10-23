//Ayanda is doing this
import {StatusCodes} from "http-status-codes";
import {BadRequestError, NotFoundError} from "../errors/index.js";
import Reward from "../models/rewardsModel.js";
import User from "../models/userModel.js";

//Get api rewards, Fetch all rewards for the logged-in user
export const getAllRewards = async (req, res) => {
    const{userId} = req.user;

    const rewards = await Reward.find({userId}).sort({redeemedAt: -1});

    if (rewards.length === 0) {
        throw new NotFoundError("No rewards found.");
    }

    res.status(StatusCodes.OK).json({rewards});
};

//Post api create rewards
export const createReward = async(req, res) => {
    const{userId} = req.user;
    const{title, cost, type} = req.body;

    if(!title || !cost) {
        throw new BadRequestError("Reward title is required.");
    }
    if(cost <= 0) {
        throw new BadRequestError("Reward cost must be greater than zero.");
    }

    const reward = await Reward.create({
        userId,
        title,
        cost,
        type: type || "custom", 
        redeemedAt: null,
    });

    res.status(StatusCodes.CREATED).json({reward});
};

//Post api redeem rewards
export const redeemReward = async(req, res) => {
    const{userId} = req.user;
    const{rewardId} = req.body;

    if(!rewardId) {
        throw new BadRequestError("Reward ID is required.");
    }

    const reward = await Reward.findOne({_id: rewardId, userId});

    if(!reward){
        throw new NotFoundError("Reward not found.");
    }

    //Prevent re-redeeming
    if(reward.redeemedAt) {
        throw new BadRequestError("Reward has already been redeemed.");
    }

    const user = await User.findById(userId);

    if(!user) {
        throw new NotFoundError("User not found.");
    }

    if(user.points < reward.cost) {
        throw new BadRequestError("Not enough points to redeem this reward.")
    }

    //Deduct points and mark as redeemed
    user.points -= reward.cost;
    reward.redeemedAt = new Date();

    await user.save();
    await reward.save();

    //Log transaction history
    res.status(StatusCodes.OK).json({
        message: "Reward redeemed successfully.",
        remainingPoints: user.points,
        reward,
    });
};

