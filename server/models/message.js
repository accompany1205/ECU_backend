import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  _id: Schema.Types.ObjectId,
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  time: {
    type: Date
  },
  isWatched: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model("Message", messageSchema)