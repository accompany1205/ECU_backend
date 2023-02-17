import express from 'express';
import passport from 'passport';
import adminMiddleware from '../../middlewares/adminMiddleware.js';

import vehicleController from '../../controllers/admin/vehicleController.js';
var router = express.Router();

router.get("/autoload", vehicleController.autoSave);
router.post("/getData", vehicleController.getData);

router.get("/getBrand", vehicleController.getBrand);
router.post("/getModel", vehicleController.getModel);
router.post("/getVersion", vehicleController.getVersion);
router.post("/getModelYear", vehicleController.getModelYear);
router.post("/getEngineModel", vehicleController.getEngineModel);
router.post("/getFuel", vehicleController.getFuel);
router.post("/getEcu", vehicleController.getEcu);


export default router;