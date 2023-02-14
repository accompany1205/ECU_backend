import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "../models/user.js";
import Travel from "../models/travel.js";
import Connection from "../models/connection.js";

const create = async (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(400).json({
      message: "Please fill all required field",
    });
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    } else {
      const newUser = new User(req.body);
      newUser._id = new mongoose.Types.ObjectId();
      //   const newUser = new User({
      //     _id: new mongoose.Types.ObjectId,
      //     name: req.body.name,
      //     email: req.body.email,
      //     password: req.body.password,
      //     role: req.body.role,
      //     isHost: req.body.isHost
      //   });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
};

const findAll = (req, res) => {
  User.find({role: { $ne: 'Admin' }})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong while getting list of users.",
      });
    });
};

const findOne = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found with id " + req.params.id,
        });
      }
      res.json(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).json({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).json({
        message: "Error getting user with id " + req.params.id,
      });
    });
};

const update = async (req, res) => {
  // Validate Request
  if (!req.body) {
    return res.status(400).send({
      message: "Please fill all required field",
    });
  }
  
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      message: "user not found with id " + req.params.id,
    });
  } else {
    Object.assign(user, req.body);
    if (req.body.password) {
      const hashedpassword = req.body.password;
      bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(hashedpassword, salt, async (err, hash) => {
          if (err) throw err;
          else {
            user.password = hash;
            try {
              await user.save();
              return res.json(user);
            } catch (e) {
              console.log(e);
              return res.status(500).send({
                message: "Can not update",
              });
            }
          }
        });
      });
    } else {
      try {
        await user.save();
        return res.json(user);
      } catch (e) {
        console.log(e);
        return res.status(500).send({
          message: "Can not update",
        });
      }
    }
  }

  // user.save()
  // .then((updatedUser) => {
  //     res.json(updatedUser)
  // })
  // .catch(err => {
  //     return res.json({message: "Cannot Update"})
  // })
};

const deleteOne = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "user not found with id " + req.params.id,
        });
      }
      res.json({ message: "user deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).json({
          message: "user not found with id " + req.params.id,
        });
      }
      return res.status(500).json({
        message: "Could not delete user with id " + req.params.id,
      });
    });
};

const deleteUsers = (req, res) => {
  User.remove({_id: { $in: req.body.ids }})
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "user not found with id " + req.params.id,
        });
      }
      res.json({ message: "user deleted successfully!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).json({
          message: "user not found with id " + req.params.id,
        });
      }
      return res.status(500).json({
        message: "Could not delete user with id " + req.params.id,
      });
    });
}

function uploadAvatar(req, res, next) {
  const userId = req.body.userId;

  User.findById(userId)
    .then((user) => {
      user.profileImage = req.body.profileImage;
      user
        .save()
        .then((updatedUser) => {
          res.json(updatedUser);
        })
        .catch(next);
    })
    .catch(next);
}

function getUserAvatar(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      res.json(user.profileImage);
    })
    .catch(next);
}

function removeUserAvatar(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      user.profileImage = null;

      user
        .save()
        .then(() => {
          res.json({ message: "Avatar for user have been removed" });
        })
        .catch(next);
    })
    .catch(next);
}

// BannerImage Manipulation
function uploadBannerImage(req, res, next) {
  const userId = req.body.userId;

  User.findById(userId)
    .then((user) => {
      user.bannerImage = req.body.bannerImage;
      user
        .save()
        .then((updatedUser) => {
          res.json(updatedUser);
        })
        .catch(next);
    })
    .catch(next);
}

function getUserBannerImage(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      res.json(user.bannerImage);
    })
    .catch(next);
}

function removeBannerImage(req, res, next) {
  User.findById(req.params.userId)
    .then((user) => {
      user.bannerImage = null;
      user
        .save()
        .then(() => {
          res.json({ message: "Banner Image for user have been removed" });
        })
        .catch(next);
    })
    .catch(next);
}

function findTravelByUserId(req, res, next) {
  Travel.find({ userId: req.params.userId })
    .then((travels) => {
      travels.forEach(function (travel) {
        travel.tripLogId = travel._id;
      })
      res.json(travels);
    })
    .catch(next);
}

const searchUsersByTrip = async (req, res, next) => {
  try {
    console.log(req.body.searchKey.substring(0, 2))
    const key = { $regex: req.body.searchKey, $options: "i" };
    let users = await User.find({
      $or: [
        {
          'mainInfo.name': key
        },
        {
          'mainInfo.location': key
        }, 
        {
          'mainInfo.lastTripLocation': key 
        }, 
        { 
          'mainInfo.nextSpotOnBucketList': key 
        }
      ] 
    }).select('mainInfo profileImage');
    users = users.filter((value, index, self) =>
      self.findIndex((t) => (
        t._id === value._id
      )) === index
    );
    if (req.body.userId){
      console.log("auth")
      users = await Promise.all(users.map(async (searchedUser) => {
        let connectionStatus;
        const connection1 = await Connection.findOne({requestingUser: req.body.userId, requestedUser: searchedUser._id});
        if (connection1) 
          connectionStatus = connection1.status=="pending" ? "Pending" : "Connected";
        const connection2 = await Connection.findOne({requestingUser: searchedUser._id.toString(), requestedUser: req.body.userId});
        if (connection2)
          connectionStatus = connection2.status=="pending" ? "Requested" : "Connected";
        if (!connection1 && !connection2)
          connectionStatus = "NotConnected";
        
        searchedUser = {...searchedUser.toJSON(), connectionStatus};
        console.log("searchedUser", searchedUser)
        return searchedUser;
      }));
      console.log("users", users)
    }
      
    // console.log("Result", users)
    res.json(users);
  } catch (err) {
    return res.json(err);
  }
}

const userController = {
  create,
  findAll,
  findOne,
  update,
  deleteOne,
  deleteUsers,
  uploadAvatar,
  removeUserAvatar,
  getUserAvatar,
  uploadBannerImage,
  removeBannerImage,
  getUserBannerImage,
  findTravelByUserId,
  searchUsersByTrip
};

export default userController;
