import express from "express"
import authRouter from './auth.js'
import userRouter from './users.js'
import newsRouter from './news.js'
import vehicleRouter from './vehicle.js'

var router = express.Router()

router
  .use('/auth', authRouter)
  .use('/user', userRouter)
  .use('/news', newsRouter)
  .use('/vehicle', vehicleRouter)

export default router;
// module.exports = router
