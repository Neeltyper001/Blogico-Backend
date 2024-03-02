import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from 'bcrypt'
import getImageId from "../utils/getImageId.js";
import { cloudinary } from "../configurations/cloudinaryUploadConfig.js";
// Update User Details
export const updateUser = async (req, res)=>{    
    if(req.body.userId === req.params.id){
        try {
            const salt =  bcrypt.genSaltSync(10);
            const hashedNewPassword =  bcrypt.hashSync(req.body.password , salt)
            req.body.password = hashedNewPassword;

            const userOld = await User.findOne({ _id: req.body.userId })
            console.log(userOld)
            console.log(userOld.profilePic)
            const userOldProfilePicId = getImageId(userOld.profilePic);
            console.log(userOldProfilePicId);

            const updatedUser = await User.findByIdAndUpdate(req.body.userId , {
                $set: req.body
            },
            {new:true})
            ;
            
            if(!updatedUser){
                return res.status(404).json("User not found with the id you have provided!")
            }

            const cloudinaryDelete = await cloudinary.api.delete_resources(
                [`blogico/users/${req.body.username}/profile/${userOldProfilePicId}`], 
                { type: 'upload', resource_type: 'image' }
                )

            console.log(cloudinaryDelete);
            res.status(200).json(updatedUser);
        } catch (error) {
            res.status(501).json({message:error.message})
        }
    }

    else{
        res.status(404).json("Different ids in body and url")
    }
}
// Delete Users Details
export const deleteUser = async (req, res)=>{
    if(req.body.id === req.params.id){
        try{            
            const targetUser = await User.findById(req.params.id)            
            await Post.deleteMany({username:targetUser.username})
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json({message: "User deleted successfully"})
        }
        catch(error){
            res.status(404).json({message:"target user not found"})
        }
    }
    else{
        res.status(404).json("The requested user doesn't matches you")
    }
}

// get User
export const getUser = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id);        
        if(!user){
            return res.status(404).json("User not found")
        }
        const {password , ...updatedUser} = user._doc;
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}