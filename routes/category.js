import express from 'express'
import { createCategory, getCategories } from '../controllers/categoryController.js'

const category = express.Router();

// POST
category.post('/',createCategory);

// GET
category.get('/',getCategories)

export default category;