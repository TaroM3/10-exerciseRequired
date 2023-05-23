const { Router, json, query } = require('express')
const { getProductsFromServer, getProductFromServer, addProductOnServer, updProductOnServer, delProductOnServer } = require('./../controllers/ProductController')
const ProductManager = require('../Dao/helpers/ProductManager')
const productModel = require('../Dao/models/product.model')
const router = Router()
//const socket = io()

// GET  /api/products[?:limit=N] 
router.get('/', getProductsFromServer )

// GET 	/api/products/:pid  
router.get('/:pid', async (req, res) =>{
    try {
        let product = await productModel.findById(req.params.pid).lean().exec()
        res.status(200).send(product)
        
    } catch (error) {
        res.status(400).send('Product does not exist.')
    }
} )

// POST /api/products
router.post('/', async(req, res) => {

    // const productNew = req.body
    try {
        let productAdded = await productModel.create({...req.body})
        
        res.status(200).send('Product has been added: \n' + productAdded)
    } catch (error) {
        console.log(error)
        res.status(400).send('Product couldnt be added.')
    }
    //const data = req.body
    // const product = new ProductManager()
    // let arrayQuery = Object.values(req.body)

    // const data = {
    //     title: arrayQuery[0],
    //     description: arrayQuery[1],
    //     code: arrayQuery[2],
    //     price: parseFloat(arrayQuery[3]), 
    //     status: true,
    //     stock: parseInt(arrayQuery[5]),
    //     category: arrayQuery[6],
    //     thumbnails: [
    //         arrayQuery[7]
    //     ]

    // } 
    // console.log(arrayQuery)
    
    // product.addProduct(data).then( (data) =>{ 
    //     console.log(data)
    //     if(data === false){
    //         res.send(400, 'Product cant be added')
    //     }else{
    //         res.send(200, 'Product added')
    //     }
    //     })
})

// PUT /api/products/:pid 
router.put('/:pid', async (req, res) => {

    // let product = await productModel.findById(req.params.pid)
    const productUpdated = req.body
    try {
        await productModel.updateOne({_id: req.params.pid}, { ...productUpdated})
        res.status(200).send('Product updated successfully.')
    } catch (error) {
     res.status(400).send('Product couldnt be updated.')   
    }
    
    // const product = new ProductManager()
    
    // const id = parseInt(req.params.pid)
    // const data = req.body

    // product.updateProductById(id, data).then(res.send(200, 'Product has been updated.'))
} ) 

// DELETE /api/products/:pid
router.delete('/:pid', async(req, res) => {
    
    try {
        await productModel.deleteOne({_id: req.params.pid})
        
        let id = req.params.pid
        console.log('Product '+id+' has been deleted.')
        res.status(200).send('Product '+id+' has been deleted.')
        
    } catch (error) {
        res.status(400).send('Product could not found.')
    }
    
    // const product = new ProductManager()
    //socket.on('')

    //socket.emit('delete', {id})
    // product.deleteProductById(id).then(res.send(200, 'Product'+ id +' has been deleted.'))
    
})

module.exports = router