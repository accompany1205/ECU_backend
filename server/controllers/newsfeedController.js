import mongoose from "mongoose";

import User from "../models/user.js";
import Connection from "../models/connection.js";
import Travel from "../models/travel.js";

const getNewsFeed = async (req, res, next) => {
  let connectedUserIds1 = await Connection.find({requestedUser: req.user.id, status: 'connected'}).select('requestingUser');
  if(connectedUserIds1) 
    connectedUserIds1 = connectedUserIds1.map(connectedUserId => connectedUserId.requestingUser);
  let connectedUserIds2 = await Connection.find({requestingUser: req.user.id, status: 'connected'}).select('requestedUser');
  if(connectedUserIds2) 
    connectedUserIds2 = connectedUserIds2.map(connectedUserId => connectedUserId.requestedUser);
  const connectedUserIds = [...connectedUserIds1, ...connectedUserIds2];

  let travels = [];
  travels = await Promise.all(connectedUserIds.map(async(connectedUserId) => {
    console.log('id', connectedUserId)
    const travels = await Travel.find({userId: connectedUserId, notification: true}).populate('userId', 'mainInfo profileImage').exec();
    return travels;
  }));
  travels = [].concat.apply([], travels);
  console.log('travels', travels);
  res.json(travels)
}

const newsfeedController = {
    getNewsFeed
};

export default newsfeedController;