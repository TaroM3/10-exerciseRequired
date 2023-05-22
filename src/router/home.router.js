const { Router } = require('express')
const ProductManager = require('../Dao/helpers/ProductManager')
const products = new ProductManager()

const user = {
    name: 'Pepe',
    lastname: 'Rodriguez'
}
const router = Router()
router.get('/', (req, res) => {
    const list = products.getAllProducts().then((product) =>{
        
        console.log(product)
        res.render('home', { product, user })
        
    })
    //console.log(list)
})

module.exports = router