import User from "../models/User.js";
import bcrypt from "bcrypt";
import { cloudinary } from "../configurations/cloudinaryUploadConfig.js";
// Signup
export const authRegistration = async (req, res)=>{    
    try {        
        const salt =  bcrypt.genSaltSync(10);
        const hashedPassword =  bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword            
        })
        
        const user = await newUser.save()
        const cloudinaryResUserFolder = await cloudinary.api.create_folder(`blogico/users/${req.body.username}`)
        console.log(cloudinaryResUserFolder)
        const cloudinaryResUserProfileFolder = await cloudinary.api.create_folder(`blogico/users/${req.body.username}/profile`)
        console.log(cloudinaryResUserProfileFolder)
        const cloudinaryResUserPostsFolder = await cloudinary.api.create_folder(`blogico/users/${req.body.username}/posts`)
        console.log(cloudinaryResUserPostsFolder)

        res.status(201).json({message:"User successfully created", result: `${user}`})
    } catch (error) {
        res.status(400).json({message:"User with same credentials already exists!"})
    }
}

// Login
export const authLogin = async (req, res)=>{
    try {
        
        const usernameValidation = await User.findOne({username: req.body.username})  
        
        if(!usernameValidation){
            return res.status(400).json({message:"Wrong username"})
            }

        const passwordValidation = await bcrypt.compare(req.body.password, usernameValidation.password)
        
        if(!passwordValidation) {
            return res.status(400).json({message:"Wrong password"})
        }
        
        const {password,...updatedUserValidation} = usernameValidation._doc;                
        res.status(201).json(updatedUserValidation)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}