import Post from "../models/Post.js";

// Create POST
export const createPost = async (req, res)=>{
    
    try {                
        const createdPost = await Post.create(req.body)        
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}
// Update POST
export const updatePost = async (req, res)=>{
    try {
        const oldPost = await Post.findById(req.params.id)
        if(oldPost.username === req.body.username){
            try {
                const updatePost = await Post.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },
                {new:true}
                )
        
                res.status(201).json({message:"Post updated successfully",results: updatePost})
            } catch (error) {
                res.status(404).json({message:error.message})
            }
        }

        else{
            res.status(404).json("User not found")
        }

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
// Delete POST
export const deletePost = async (req, res)=>{
    try {
        const deletePost = await Post.findByIdAndDelete(req.params.id)
        res.status(201).json({message:"Post deleted successfully", results: deletePost})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
// Get POST
export const getPost = async (req, res)=>{
    try{
        const getPost = await Post.findById(req.params.id);
        res.status(200).json(getPost)
    }catch (error) {
        res.status(500).json({message:error.message})
    }
}
// Get All POSTs
export const getAllPost = async (req, res)=>{
    try {                
        const queryUsername = req.query.username;        
        const queryCategory = req.query.categories;
        let allPosts;

        if(queryUsername){
            allPosts = await Post.find({username: queryUsername})            
        }
        else if(queryCategory){
            allPosts = await Post.find({categories:{
                $in:[queryCategory]
            }})
        }else{
            allPosts = await Post.find()
        }

        res.status(200).json(allPosts);

    } catch (error) {
        res.status(500).json(error)
    }
}