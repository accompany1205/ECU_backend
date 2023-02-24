import express from 'express';
import passport from 'passport';
import adminMiddleware from '../../middlewares/adminMiddleware.js';

import vehicleController from '../../controllers/admin/vehicleController.js';
var router = express.Router();

router.get("/autoload", vehicleController.autoSave);





export default router;