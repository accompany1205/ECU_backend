import express from 'express';
import passport from 'passport';

import messageController from '../controllers/messageController.js';
var router = express.Router();

router.get("/users/:userId/:searchText", passport.authenticate('jwt', {session: false}), messageController.findUsers);
router.get("/address/:id", passport.authenticate('jwt', {session: false}), messageController.getAddress);
router.post("/messages", passport.authenticate('jwt', {session: false}), messageController.getMessages);

export default router;