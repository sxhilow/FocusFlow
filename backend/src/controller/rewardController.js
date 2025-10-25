//Ayanda is doing this
import {StatusCodes} from "http-status-codes";
import {BadRequestError, NotFoundError} from "../errors/index.js";
import Rewards from "../models/rewardsModel.js";
import User from "../models/userModel.js";
import Transaction from "../models/transactionModel.js"

//Get (api) rewards, Fetch all rewards for the logged-in user
export const getAllRewards = async (req, res) => {

    const rewards = await Rewards.find().sort({cost: 1});

    if (!rewards || rewards.length === 0) {
        throw new NotFoundError("No rewards available.");
    }

    res.status(StatusCodes.OK).json({rewards});
};

//Post (api) create rewards - (End User not allowed to create Rewards)

//Post (api) redeem rewards
export const redeemReward = async(req, res) => {
    const{userId} = req.user;
    const{id : rewardId} = req.params;

    if(!rewardId) {
        throw new BadRequestError("Reward ID is required.");
    }

    const reward = await Rewards.findOne({_id: rewardId});

    if(!reward){
        throw new NotFoundError("Reward not found.");
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

    await Transaction.create({
        userId,
        type: 'redeem',
        amount: -reward.cost,
        balanceAfter: user.points,
        reason: `Redeemed reward: ${reward.title}`,
    });

    res.status(StatusCodes.OK).json({
        message: "Reward redeemed successfully.",
        remainingPoints: user.points,
        reward,
    });
};

