import express from 'express'

import { updateUser, deleteUser , getUser } from "../controllers/userController.js";

const user = express.Router()

// Update Route
    user.put('/:id',updateUser)

// Delete User
    user.delete('/:id',deleteUser)   
    
// get User
    user.get('/:id',getUser)    

export default user;    


