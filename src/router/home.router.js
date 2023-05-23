const { Router } = require('express')
const ProductManager = require('../Dao/helpers/ProductManager')
const productModel = require('../Dao/models/product.model')
const products = new ProductManager()

const user = {
    name: 'Pepe',
    lastname: 'Rodriguez'
}
const router = Router()
router.get('/', async (req, res) => {
    // const list = products.getAllProducts().then((product) =>{
        
    //     console.log(product)
    //     res.render('home', { product, user })
        
    // })
    const products = await productModel.find().lean().exec()
    console.log(products)
    res.render('home', { products })
    //console.log(list)
})

module.exports = router