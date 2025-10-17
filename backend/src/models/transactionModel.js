import mongoose from "mongoose";

const PointTransactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    index: true
  },
  
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
    required: function() {
      return this.type === 'earn';
    }
  },
  
  type: {
    type: String,
    required: [true, 'Transaction type is required'],
    enum: {
      values: ['earn', 'redeem'],
      message: 'Type must be either earn, redeem, or bonus'
    },
    index: true
  },
  
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    validate: {
      validator: function(value) {
        return value !== 0;
      },
      message: 'Amount cannot be zero'
    }
  },
  
  balanceAfter: {
    type: Number,
    required: [true, 'Balance after transaction is required'],
    min: [0, 'Balance after transaction cannot be negative']
  },
  
  reason: {
    type: String,
    required: [true, 'Reason is required'],
    trim: true,
    maxlength: [200, 'Reason cannot exceed 200 characters']
  },
  
}, {timestamps: true});

PointTransactionSchema.index({ userId: 1, createdAt: -1 });


export default mongoose.model('Transaction', PointTransactionSchema)