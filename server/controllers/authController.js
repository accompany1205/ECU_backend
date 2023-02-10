import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Joi from "@hapi/joi";
import nodemailer from "nodemailer";
import mongoose from "mongoose";

import keys from "../config/key.js";

// Create Transport
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: keys.emailAddress,
    pass: keys.emailPassword,
  },
});

const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().min(3).required().email(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

export const register = async (req, res) => {
  // CHECKING IF USER EMAIL ALREADY EXISTS
  console.log(req.body);
  const emailExist = await User.findOne({ email: req.body.email });
  // IF EMAIL EXISTS THEN RETURN
  if (emailExist) {
    res.status(400).send("Email already exists");
    return;
  }

  // HASHING THE PASSWORD

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  // ON PROCESS OF ADDING NEW USER

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  console.log(req.body);

  try {
    // VALIDATION OF USER INPUTS

    const { error } = await registerSchema.validateAsync(req.body);

    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    } else {
      // Generate a verification token with the user's ID

      const verificationToken = await user.generateVerificationToken();
      console.log(verificationToken);
      const server_port = keys.port;
      const siteURL = keys.siteURL;

      // Email the user a unique verification link
      const url = `${siteURL}/auth/verify/${verificationToken}`;
      console.log(url);
      const { email } = req.body;
      // await transporter.sendMail({
      //   to: email,
      //   subject: "Verify Account",
      //   html: `<div style='text-align: center'>
      //           <h2>You have a message from Vagavoy</h2>
      //           <h3>Click <a href = '${url}' >here</a> to confirm your email.</h3>
      //         </div>`,
      // });
      const saveUser = await user.save();
      res.status(200).send("user created");
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

export const login = async (req, res) => {
  // CHECKING IF EMAIL EXISTS

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect Email");

  // CHECKING IF USER PASSWORD MATCHES

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Incorrect Password");

  try {
    // VALIDATION OF USER INPUTS

    const { error } = await loginSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      const payload = {
        id: user._id,
        email: user.email,
        userProfile: {
          id: user._id,
          name: user.name,
          role: user.role,
          bannerImage: user.bannerImage,
          about: user.about,
          email: user.email,
        },
        verified: user.verified,
      };
      jwt.sign(
        payload,
        keys.secretOrKey,
        {expiresIn: 24 * 3600 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
            id: user._id,
          });
        }
      );
      // res.header('auth-token', token).send(token)
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

const verify = async (req, res) => {
  const token = req.params["token"];
  console.log('verify', token);
  // Check we have an id
  if (!token) {
    return res.status(422).json({
      message: "Missing Token",
    });
  }

  // Verify the token from the URL
  let payload = null;
  try {
    payload = jwt.verify(token, keys.userVerificationTokenSecret);
  } catch (err) {
    return res.status(500).json(err);
  }

  try {
    // Find user with matching ID
    User.findOne({ _id: payload.ID }).then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User does not  exists",
        });
      }
      // Update user verification status to true
      user.verified = true;
      user.save();
      return res.status(200).json({
        message: "Account Verified",
      });
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const authController = {
  login,
  register,
  verify,
};
export default authController;
