import mongoose from 'mongoose';
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const Schema = mongoose.Schema;

const userSchema = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
    min:6,
    max: 255
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now()
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  profileImage: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  address:{
    type: String,
    required: false,
    max: 255,
    min: 6
  },
  country:{
    type: String,
    required: false,
    max: 255,
    min: 6
  },
  state:{
    type: String,
    required: false,
    max: 255,
    min: 6
  },
  city:{
    type: String,
    required: false,
    max: 255,
    min: 6
  },
  zipCode:{
    type: String,
    required: false,
  },
  about: {
    type: String,
    max: 1024,
    min: 6
  },
  status: {
    type: String,
    required: true,
    default:'Active'
  },
  facebookLink:{
    type: String,
    required: false,
  },
  instagramLink:{
    type: String,
    required: false,
  },
  linkedinLink:{
    type: String,
    required: false,
  },
  twitterLink:{
    type: String,
    required: false,
  },
  company:{
    type: String,
    required: false,
  },
  role:{
    type: String,
    required: true,
    default: 'User'
  },
  isPublic: {
    type: Boolean,
    required: true,
    default: false
  }
});

userSchema.methods.generateVerificationToken = function () {
  const user = this;
  const verificationToken = jwt.sign(
      { ID: user._id },
      process.env.USER_VERIFICATION_TOKEN_SECRET,
      { expiresIn: "10m" }
  );
  return verificationToken;
};

userSchema.methods.generateResetPasswordToken = function () {
  crypto.randomBytes(20, (err, buf) => {
    if (err) {
      // Prints error
      console.log(err);
      return;
    }
    
    // Prints random bytes of generated data
    return buf.toString('hex');
  });
};

export default mongoose.model("User", userSchema);