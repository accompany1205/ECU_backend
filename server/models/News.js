import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const newsSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    required: true
  },
  imageUrl : {
    type: String,
    required: true
  },
  title : {
    type: String,
    required: true,
  },
  content : {
    type : String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: 'active'
  }
});

export default mongoose.model("news", newsSchema);