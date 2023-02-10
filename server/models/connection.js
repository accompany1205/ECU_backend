import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const connectionSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  requestingUser: {
    type: String
  },
  requestedUser: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'connected'],
    default: 'pending'
  }
});

export default mongoose.model("Connection", connectionSchema);