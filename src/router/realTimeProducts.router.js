const { Router } = require('express')
// const ProductManager = require('../Dao/helpers/ProductManager')
const productModel = require('../Dao/models/product.model')
const router = Router()
// const products = new ProductManager()

router.get('/', async(req, res) => {
    const product = await productModel.find().lean().exec()

    
    res.render('realTimeProducts', { product })
    
    // products.getAllProducts().then(async (product) =>{
         //console.log(product)
         //res.render('home', { product, user })
        
    // })
})

module.exports = router