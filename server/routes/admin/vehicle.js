import express from 'express';
import passport from 'passport';
import adminMiddleware from '../../middlewares/adminMiddleware.js';

import vehicleController from '../../controllers/admin/vehicleController.js';
var router = express.Router();

router.get("/autoload", vehicleController.autoSave);
router.post("/getData", vehicleController.getDate);
router.get("/getBrand", vehicleController.getBrand);


export default router;