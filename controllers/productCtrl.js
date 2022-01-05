const Products = require('../models/productModel')
class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
       const queryObj = {...this.queryString} //queryString = req.query

       const excludedFields = ['page', 'sort', 'limit']
       excludedFields.forEach(el => delete(queryObj[el]))
       
       let queryStr = JSON.stringify(queryObj)
       queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)

    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
       this.query.find(JSON.parse(queryStr))
         
       return this;
    }
}

const productCtrl = {
    getProducts: async(req, res) =>{
        try {
            const products = await Products.find()
            res.json(products)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createProduct: async(req, res) =>{
        try {
            const {product_id, title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "Rasm jo'natilmadi"})
            const product = await Products.findOne({product_id})
            if(product)
                return res.status(400).json({msg: "Bu mahsulot o'zi bor"})
            const newProduct = new Products({
                 product_id, title: title.toLowerCase(), price, description, content, images, category
            })
            await newProduct.save()
            res.json({msg: "Product yaratildi"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteProduct: async(req, res) =>{
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Product o'chdi"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateProduct: async(req, res) =>{
        try {
            const {title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: "Rasm jo'natilmadi"})
            await Products.findOneAndUpdate({_id: req.params.id}, {
                 title: title.toLowerCase(), price, description, content, images, category
            })
            res.json({msg: "Product yangilandi"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = productCtrl