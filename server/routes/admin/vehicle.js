import express from 'express';
import passport from 'passport';

import vehicleController from '../../controllers/admin/vehicleController.js';
var router = express.Router();

router.get("/", vehicleController.autoSave);

export default router;