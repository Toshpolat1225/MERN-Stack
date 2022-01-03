const Category = require('../models/categoryModel')
const categoryCtrl = {
    getCategories: async(req, res)=>{
        try {
            const categories = await Category.find()
            res.json(categories)
            
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    createCategory: async(req, res)=>{
        try {
            res.json("Category admindan qoshish")
        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    }
}
module.exports = categoryCtrl