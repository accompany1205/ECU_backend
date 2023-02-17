import express from "express"
import authRouter from './auth.js'
import userRouter from './users.js'
import newsRouter from './news.js'

var router = express.Router()

router
  .use('/auth', authRouter)
  .use('/user', userRouter)
  .use('/news', newsRouter)

export default router;
// module.exports = router
