const Products = require('../models/productModel')

const productCtrl = {
    getProducts: async(req, res) =>{
        try {
            res.json("keldi")
            // const features = new APIfeatures(Products.find(), req.query)
            // .filtering().sorting().paginating()

            // const products = await features.query

            // res.json({
            //     status: 'success',
            //     result: products.length,
            //     products: products
            // })
            
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