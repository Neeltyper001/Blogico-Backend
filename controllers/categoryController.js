import Category from "../models/Category.js";


// controller for Creating Category
export const createCategory = async (req, res) =>{
    try {
        const createdCategory = await Category.create(req.body);
        console.log(createCategory);

        res.status(201).json(createdCategory);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// controller for getting category
export const getCategories = async (req,res)=>{
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
         res.status(500).json({message:error.message})
    }
}