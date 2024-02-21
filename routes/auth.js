import express from 'express'
import { authRegistration , authLogin} from '../controllers/authController.js'

const auth = express.Router()

// SignUp User
    auth.post('/register',authRegistration)
// Login User
    auth.post('/login',authLogin)

export default auth;