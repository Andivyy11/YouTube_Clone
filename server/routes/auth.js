import express from 'express'
import { signup, signin ,googleAuth } from '../controllers/auth.js'

const router = express.Router();

//create user
router.post('/signup', signup)

//sign in
router.post('/signin', signin)

//sign in
router.post('/google', googleAuth)

export default router