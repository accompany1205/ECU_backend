import express from 'express';
import passport from 'passport';

import vehicleController from '../controllers/vehicleController.js';
var router = express.Router();

router.post("/getData", vehicleController.getData);

router.get("/getBrand", vehicleController.getBrand);
router.post("/getModel", vehicleController.getModel);
router.post("/getVersion", vehicleController.getVersion);
router.post("/getModelYear", vehicleController.getModelYear);
router.post("/getEngineModel", vehicleController.getEngineModel);
router.post("/getFuel", vehicleController.getFuel);
router.post("/getEcu", vehicleController.getEcu);
//router.post("/upload-request", vehicleController.uploadRequest);




export default router;