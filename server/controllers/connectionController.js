import mongoose from "mongoose";

import User from "../models/user.js";
import Connection from "../models/connection.js";


const getConnections = async (currentUser) => {
  const userId = currentUser.id;
  let requestingUserIds = await Connection.find({requestedUser: userId, status: 'pending'}).select('requestingUser');
  if(requestingUserIds)
    requestingUserIds = requestingUserIds.map(requestingUserId => requestingUserId.requestingUser)
  console.log('requestingid', requestingUserIds);

  let connectedUserIds1 = await Connection.find({requestedUser: userId, status: 'connected'}).select('requestingUser');
  if(connectedUserIds1) 
    connectedUserIds1 = connectedUserIds1.map(connectedUserId => connectedUserId.requestingUser);
  let connectedUserIds2 = await Connection.find({requestingUser: userId, status: 'connected'}).select('requestedUser');
  if(connectedUserIds2) 
    connectedUserIds2 = connectedUserIds2.map(connectedUserId => connectedUserId.requestedUser);
  const connectedUserIds = [...connectedUserIds1, ...connectedUserIds2];
  console.log("connectedUserids", connectedUserIds);

  let linkedUserIds1 = await Connection.find({requestedUser: userId}).select('requestingUser');
  if(linkedUserIds1) 
    linkedUserIds1 = linkedUserIds1.map(linkedUserId => linkedUserId.requestingUser);
  let linkedUserIds2 = await Connection.find({requestingUser: userId}).select('requestedUser');
  if(linkedUserIds2) 
    linkedUserIds2 = linkedUserIds2.map(linkedUserId => linkedUserId.requestedUser);
  const linkedUserIds = [...linkedUserIds1, ...linkedUserIds2];
  console.log("linkdedUserIds", linkedUserIds);

  let requestingUsers = [];
  requestingUsers = await Promise.all(requestingUserIds.map(async(requestingUserId) => {
    const requestingUser = await User.findById(requestingUserId).select('mainInfo profileImage');
    return requestingUser;
  }));
  console.log('1', requestingUsers)

  let connectedUsers = [];
  connectedUsers = await Promise.all(connectedUserIds.map(async(connectedUserId) => {
    console.log('id', connectedUserId)
    const connectedUser = await User.findById(connectedUserId).select('mainInfo profileImage');
    return connectedUser;
  }));
  console.log('21', connectedUsers)

  let recommendedUsers = await User.find({'mainInfo.location' : currentUser.mainInfo.location}).select('mainInfo profileImage bannerImage');
  recommendedUsers = recommendedUsers.filter(recommendedUser => recommendedUser._id != userId && !linkedUserIds.includes(recommendedUser._id.toString()));
  console.log("recommendedusers",recommendedUsers);
  return {connectedUsers, requestingUsers, recommendedUsers}
}

const connectRequest = async (req, res, next) => {
  const connection = new Connection({
    _id: new mongoose.Types.ObjectId(),
    requestingUser: req.user.id,
    requestedUser: req.body.userId
  });
  try {
    await connection.save();
    res.json(await getConnections(req.user))
  } catch(e) {
    res.status(404).send('Request failed');
  }
}

const connectAccept = async (req, res, next) => {
  let connection = await Connection.findOne({requestingUser: req.body.userId, requestedUser: req.user.id});
  connection.status = 'connected';
  await connection.save();
  res.json(await getConnections(req.user));
}

const connectReject = async (req, res, next) => {
  await Connection.deleteOne({requestingUser: req.body.userId, requestedUser: req.user.id});
  res.json(await getConnections(req.user));
}

const connectRemove = async (req, res, next) => {
  await Connection.deleteOne({requestingUser: req.body.userId, requestedUser: req.user.id});
  await Connection.deleteOne({requestingUser: req.user.id, requestedUser: req.body.userId});
  res.json(await getConnections(req.user))
}

const connections = async (req, res, next) => {
  try {
    const result = await getConnections(req.user);
    res.json(result);
  }
  catch(err) {res.status(404).send(err);}

}

const connectionController = {
  connections,
  connectRequest,
  connectAccept,
  connectReject,
  connectRemove,
}

export default connectionController;
