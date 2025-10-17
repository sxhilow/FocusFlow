import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { createAuthToken } from "../utils/jwt.js"

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide your name'],
        minlength:3,
        maxlength: 20
    },
    email:{
        type:String,
        required:[true, 'Please provide email'],
        match:[/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, 'Please provide a valid email'],
        unique:true,
        lowercase:true
    },
    password:{
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    points:{
        type: Number,
        default: 0,
        min: [0, "Points cannot be negative"]
    },
    streak:{
        current: {
            type: Number,
            default: 0
        },
        longest: {
            type: Number,
            default: 0
        },
        lastDate: { 
            type: Date, 
            default: null 
        }
    }
}, {timestamps:true})

UserSchema.index({ createdAt: -1 });

UserSchema.pre('save', async function(){

    if(!this.isModified('password')) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.index({ email: 1 }, { unique: true })

UserSchema.methods.createJWT = function(){
    return createAuthToken({userId: this._id, name: this.name})
}


UserSchema.methods.comparePassword = async function(userPassword){
    const isMatch = await bcrypt.compare(userPassword, this.password)
    return isMatch
}

export default mongoose.model('User', UserSchema)