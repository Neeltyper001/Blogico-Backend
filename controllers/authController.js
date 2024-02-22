import User from "../models/User.js";
import bcrypt from "bcrypt";

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