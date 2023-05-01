const { Router, json, query } = require('express')
const { getProductsFromServer, getProductFromServer, addProductOnServer, updProductOnServer, delProductOnServer } = require('./../controllers/ProductController')
const ProductManager = require('./../helpers/ProductManager')
const router = Router()
//const socket = io()

// GET  /api/products[?:limit=N] 
router.get('/', getProductsFromServer )

// GET 	/api/products/:pid  
router.get('/:pid', getProductFromServer )

// POST /api/products
router.post('/', (req, res) => {
    //const data = req.body
    const product = new ProductManager()
    let arrayQuery = Object.values(req.body)

    const data = {
        title: arrayQuery[0],
        description: arrayQuery[1],
        code: arrayQuery[2],
        price: parseFloat(arrayQuery[3]), 
        status: true,
        stock: parseInt(arrayQuery[5]),
        category: arrayQuery[6],
        thumbnails: [
            arrayQuery[7]
        ]

    } 
    console.log(arrayQuery)
    
    product.addProduct(data).then( (data) =>{ 
        console.log(data)
        if(data === false){
            res.send(400, 'Product cant be added')
        }else{
            res.send(200, 'Product added')
        }
        })
    //res.send(200,'Product added' )
})

// PUT /api/products/:pid 
router.put('/:pid', (req, res) => {
    const product = new ProductManager()
    
    const id = parseInt(req.params.pid)
    const data = req.body

    product.updateProductById(id, data).then(res.send(200, 'Product has been updated.'))
} ) 

// DELETE /api/products/:pid
router.delete('/:pid', (req, res) => {
    
    let id = parseInt(req.params.pid)
    const product = new ProductManager()
    //socket.on('')

    console.log(id)
    //socket.emit('delete', {id})
    product.deleteProductById(id).then(res.send(200, 'Product has been deleted.'))
    
})

module.exports = router