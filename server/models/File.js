import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  senderId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  dueAt:{
    type: Date,
    required: true
  },
  fileUrl:{
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true,
    default: 'request'
  }
});

export default mongoose.model("File", fileSchema);