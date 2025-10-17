import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    taskId: {
        type: mongoose.Types.ObjectId,
        ref: 'Task',
        default: null
    },
    status: {
        type: String,
        enum: ['pending', 'active', 'stopped', 'finalized'],
        default: 'pending'
    },
    startTime: { 
        type: Date 
    },
    endTime: { 
        type: Date 
    },
    duration: { 
        type: Number, 
        min: 0, 
        default: 0 
    },
    commitmentText: { 
        type: String, 
        required: [true, 'Commitment text is required'], 
        trim: true,
        minlength: 1
    },
    reflection: {
        type: [String],
        default: [],
        validate: {
            validator: function(v) {
                if(this.status === 'finalized') return v.length > 0;
                return true;
            },
            message: 'Reflection is required before finalization'
        }
    },
    validated: { 
        type: Boolean, 
        default: false },
    points: { 
        type: Number, 
        default: 0, 
        min: 0 }
}, { timestamps: true });

SessionSchema.pre('save', function() {
    if(this.startTime && this.endTime) {
        this.duration = (this.endTime - this.startTime) / (1000 * 60);
    }
})

SessionSchema.index({ userId: 1, startTime: -1 });
SessionSchema.index({ userId: 1, status: 1 });
SessionSchema.index({ userId: 1, createdAt: -1 });
SessionSchema.index({ createdAt: 1 }, { expireAfterSeconds: 31536000 }); // TTL 1 year


export default mongoose.model('Session', SessionSchema)

