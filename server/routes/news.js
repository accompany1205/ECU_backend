import express from 'express';
import newscontroller from "../controllers/newsController.js";

var router = express.Router();

router.get('/', newscontroller.getNews);

export default router;