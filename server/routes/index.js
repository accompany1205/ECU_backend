import express from "express"
import authRouter from './auth.js'
import userRouter from './users.js'

var router = express.Router()

router
  .use('/auth', authRouter)
  .use('/user', userRouter)

export default router;
// module.exports = router
