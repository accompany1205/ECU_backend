import express from "express"
import authRouter from './auth.js'
import userRouter from './users.js'

var router = express.Router()

router
  .use('/auth', authRouter)
  .use('/user', userRouter)

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "asdf" });
});

export default router;
// module.exports = router
