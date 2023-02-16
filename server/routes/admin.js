import express from "express"
import vehicleRouter from './admin/vehicle.js'
import userRouter from './admin/users.js'
import newsRouter from './admin/news.js'

var router = express.Router()

router
  .use('/vehicle', vehicleRouter)
  .use('/user', userRouter)
  .use('/news', newsRouter)

export default router;
// module.exports = router
