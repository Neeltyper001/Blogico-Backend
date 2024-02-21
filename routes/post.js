import express from 'express'
import { createPost, updatePost, deletePost, getAllPost, getPost } from '../controllers/postController.js'

const postRouter  = express.Router()

// Create Post
    postRouter.post('/',createPost)
// Update Post
    postRouter.put('/:id',updatePost)
// Delete Post
    postRouter.delete('/:id',deletePost)
// Get Post
    postRouter.get('/:id',getPost)
// Get Posts
    postRouter.get('/',getAllPost)

export default postRouter;    