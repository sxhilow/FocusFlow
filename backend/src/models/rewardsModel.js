import mongoose from "mongoose";

const RewardsSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true, 'Reward title is required'],
        unique: true,
        trim:true
    },
    description: {
        type: String,
        required: [true, "Reward description is required"],
        trim: true,
    },
    cost:{
        type:Number,
        required: [true, 'Reward cost is required'],
        min:[0, 'Cost cannot be less then 0']
    }
}, {timestamps:true})


export default mongoose.model('Rewards', RewardsSchema)