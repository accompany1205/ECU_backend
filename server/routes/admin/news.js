import express from 'express';
import passport from 'passport';

import newsController from '../../controllers/admin/newsController.js';
import adminMiddleware from '../../middlewares/adminMiddleware.js';

var router = express.Router();


router.get("/", newsController.getNews);
router.post("/add", passport.authenticate('jwt', {session: false}), adminMiddleware, newsController.addNews);
router.post("/update", passport.authenticate('jwt', {session: false}), adminMiddleware, newsController.updateNews);
router.post("/delete", passport.authenticate('jwt', {session: false}), adminMiddleware, newsController.deleteNews);


export default router;