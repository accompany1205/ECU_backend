import express from 'express'
import passport from 'passport'
import authController from '../controllers/authController.js'

const router = express.Router()



router.get('/test', passport.authenticate('jwt', {session: false}), async (req, res) => {
  res.send("sdfasdf")
})

// SIGNUP USER
router.post('/register', authController.register)

// LOGIN USER
router.post('/login', authController.login)

// Verify Email
router.get('/verify/:token', authController.verify)

export default router;