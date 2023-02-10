import express from 'express';
import passport from 'passport';

import userController from '../controllers/userController.js';
import connectionController from '../controllers/connectionController.js'
import userMiddleware from '../middlewares/userMiddleware.js';
var router = express.Router();

/* GET users listing. */
// router.get("/", function (req, res, next) {
//   res.send("respond with a resource");
// });

/**
 * USER CRUD
 */
router.post("/", passport.authenticate('jwt', {session: false}), userController.create);

router.get("/", userController.findAll);

router.get("/:id", userController.findOne);

router.put("/:id", passport.authenticate('jwt', {session: false}), userMiddleware, userController.update);

router.delete("/:id", passport.authenticate('jwt', {session: false}), userMiddleware, userController.deleteOne);

router.post("/avatar", passport.authenticate('jwt', {session: false}), userMiddleware, userController.uploadAvatar);

router.get("/travels/:userId", userController.findTravelByUserId);

router.route("/avatar/:userId")
  .get(passport.authenticate('jwt', {session: false}), userController.getUserAvatar)
  .delete(passport.authenticate('jwt', {session: false}), userMiddleware, userController.removeUserAvatar);

router.route("/bannerImage/:userId")
  .get(passport.authenticate('jwt', {session: false}), userController.getUserBannerImage)
  .delete(passport.authenticate('jwt', {session: false}), userMiddleware, userController.removeBannerImage);

router.post("/search", userController.searchUsersByTrip);

router.post("/connectRequest", passport.authenticate('jwt', {session: false}), connectionController.connectRequest);

router.post("/connectAccept", passport.authenticate('jwt', {session: false}), connectionController.connectAccept);

router.post("/connectReject", passport.authenticate('jwt', {session: false}), connectionController.connectReject);

router.post("/connectRemove", passport.authenticate('jwt', {session: false}), connectionController.connectRemove);

export default router;