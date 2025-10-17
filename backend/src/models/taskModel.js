import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId, // foreign key
        ref: 'User',
        required:[true, 'Please provide user id when creating a task'] 
    },
    title:{
        type:String,
        required:[true, 'Title is required']
    },
    start:{
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true,
        validate:{
            validator: function(value){
                return this.start < value;
            },
            message: 'End date must be after start date'
        }
    },
    category: {
        type: String,
        required: true,
        enum: ['Work', 'Health', 'Study', "Focus", 'Deep work'],
        default: 'Work'
    },
    duration:{
        type:Number,
        min:[0, 'Duration cannot be less than 0']
    },
    completed:{
        type:Boolean,
        default:false
    },
    pointsEarned: {
        type:Number,
        default: 0
    }
}, {timestamps: true})

TaskSchema.index({ userId: 1, start: 1, end: 1 });


TaskSchema.pre('save', function(){
    this.duration = (this.end - this.start) / (1000 * 60);
})

export default mongoose.model('Task', TaskSchema)