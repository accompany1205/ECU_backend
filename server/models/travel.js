import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const travelSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  mainTrip: {
    type: Boolean,
    default: false
  },
  tripCountryCode: {
    type: String,
    required: true
  },
  tripLocation: {
    type: String,
    required: true
  },
  tripStartDate: {
    type: Date
  },
  tripEndDate: {
    type: Date
  },
  tripDescription: {
    type: String
  },
  tripGallery: [{
    tripImageId: { type: String },
    backgroundInfo: { type: String },
    src: { type: String }
  }],
  tripRecommendations: [{
    title: {
      type: String,
      enum: ['Accommodation', 'Eating & Drinking', 'Getting There & Getting Around', 'Activities', 'Other Tips']
    },
    description: { type: String }
  }],
  notification: {
    type: Boolean,
    default: false
  }
})

export default mongoose.model("Travel", travelSchema)