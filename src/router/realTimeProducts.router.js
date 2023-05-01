const { Router } = require('express')
const ProductManager = require('./../helpers/ProductManager')
const router = Router()
const products = new ProductManager()

router.get('/', (req, res) => {
    products.getAllProducts().then((product) =>{
        
        //console.log(product)
        //res.render('home', { product, user })
        res.render('realTimeProducts', {product})
        
    })
})

module.exports = router