const express = require('express')
const chatRouter = require('./router/chat.router')
const productRouter = require('./router/products.router')
const cartRouter = require('./router/carts.router')
const homeRouter = require('./router/home.router')
const realTimeProductsRouter = require('./router/realTimeProducts.router')
const productForm = require('./router/productForm.router')
const handlebars = require('express-handlebars')
const { Server, Socket } = require('socket.io')
const server = express()
const ProductManager = require('./Dao/helpers/ProductManager')
// import mongoose from 'mongoose'
const mongoose = require('mongoose')
const httpServer = server.listen(8080, () => console.log('Server Up'))
/*server.use((req, res, next) => {
    console.log('Time: ', new Date().toLocaleString())
    next()
})*/


const uri = 'mongodb+srv://taromelillo:Hw8C2a43e6CXWHK6@cluster0.4lcw6qm.mongodb.net/'

const main = async() => {

    await mongoose.connect(uri, {
        dbName: 'ecommerce'
    })
    console.log('-----DB connected----')
}

main()
const io = new Server(httpServer)
server.use(express.urlencoded({extended : true}))
server.use(express.json())


server.engine('handlebars', handlebars.engine())
server.set('views', 'src/views')
server.set('view engine', 'handlebars')

server.use('/home', homeRouter)

server.use(express.static('src/views'))
server.use('/', productForm)

server.use('/realTimeProducts', realTimeProductsRouter)

//server.use('')
server.use('/api/products', productRouter)

//server.use('/products/:pid', productRouter)

server.use('/api/carts', cartRouter)

server.use('/chat', chatRouter)

const products = new ProductManager()
let messages = []

io.on('connection', socket => {
    console.log('Time: ', new Date().toLocaleString() +' Client socket ' + socket.id + ' connected')
    socket.on('productAdded', data => {
        products.addProduct(data.product)
        io.emit('logs', data)
    })
    socket.on('delete', id => {
        console.log(id.id)
        products.deleteProductById(id.id)
        console.log('Deleting Product...')
        io.emit('productDeleted', id)
    })
    socket.on('message', data => {
        console.log(data)
        messages.push(data)
        //console.log(messages)
        io.emit('conversations', data)
    })
})

    /*socket.on('message', data => {
        io.emit('logs', data) 
    })*/

