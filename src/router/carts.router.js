const { Router } = require('express')
const {getProductsCartFromServer, addCartOnServer, addProductCartOnServer} = require('./../controllers/CartController')
const CartManager = require('../Dao/helpers/CartManager')
const ProductManager = require('../Dao/helpers/ProductManager')
const cartModel = require('../Dao/models/cart.model')
const productModel = require('../Dao/models/product.model')
const router = Router()

//POST /api/carts/ 
router.post('/', async(req, res) => {
    await cartModel.create({
        product:{
            
        }
    })
    res.status(200).send('A cart has been created')
})
// GET /api/carts/:cid 
router.get('/:cid', async (req, res) => {
    let cart = await cartModel.findById(req.params.cid).populate('products.product')
    res.status(200).send(cart)
})


//POST /api/carts/:cid/product/:pid  
router.post('/:cid/product/:pid', async(req, res) => {


    try {
        let cart = await cartModel.findById(req.params.cid).populate('products.product')
       
            let product = await productModel.findById(req.params.pid)

            cart.products.push({product});
            let result = await cartModel.updateOne({_id: req.params.cid}, cart)
            console.log(result)  

            res.status(200).send(result + 'Product added to the Cart successfully')
            
       
            // console.log('Product does not exist')      
        
    } catch (error) {
        console.log('Cart does not exist')
        res.status(400).send('Cart or Product does not exist')
    }
    

    // const carts = new CartManager()
    // const cartId = parseInt(req.params.cid)
    // const productId = parseInt(req.params.pid)
    // const products = new ProductManager()
    // carts.getCartById(cartId).then(cart => {
        
    //     if(cart !== undefined){

    //         products.getProductById(productId).then(product =>{
    //             //console.log(product)
    //             if(product !== undefined){
    //                 carts.addProductToCart(cartId, productId).then(res.status(200).send('Product ' + productId +' has been added to the cart ' + cartId))
                    
    //             }else{
    //                 res.status(400).send('Product ' + productId +' does not exist')
    //             }
    //         })
    //     }else{
    //         res.status(400).send('Cart ' + cartId + ' does not exist')
    //     }
    })
    
    /*console.log(product)
    if(product !== undefined){
    }*/


module.exports = router