import express from "express"
import vehicleRouter from './admin/vehicle.js'

var router = express.Router()

router
  .use('/vehicle', vehicleRouter)

export default router;
// module.exports = router
