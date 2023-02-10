import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const billSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type: Number
  },
  createdAt: {
    type: Date
  },
});

export default mongoose.model("Bill", billSchema);