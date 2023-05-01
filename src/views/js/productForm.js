let socket = io()

let button = document.getElementById('addProduct')
let title = document.getElementById('title')
let description = document.getElementById('description')
let code = document.getElementById('code')
let status = document.getElementById('status')
let thumbnails = document.getElementById('thumbnails')


socket.on('')
button.addEventListener('click', () => {
    if(title.value.trim().length > 0 || description.value.trim().length > 0 || code.value.trim().length > 0 || status.value.trim().length > 0 ){
        console.log('title esta completo')
        let product = {
            title: title.value,
            description: description.value,
            code: code.value,
            price: parseFloat(price.value), 
            status: true,
            stock: parseInt(stock.value),
            thumbnails: [
            thumbnails.value
        ]
        }
        console.log(product)
        socket.emit('productAdded' , {product})
    }else{
        console.log('vacio')
    }
})