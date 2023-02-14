import express from "express"
import vehicleRouter from './admin/vehicle.js'
import userRouter from './admin/users.js'

var router = express.Router()

router
  .use('/vehicle', vehicleRouter)
  .use('/user', userRouter)

export default router;
// module.exports = router
