let socket = io()

let button = document.getElementById('addProduct')
let title = document.getElementById('title')
let description = document.getElementById('description')
let code = document.getElementById('code')
let status = document.getElementById('status')
let category = document.getElementById('category')
let thumbnails = document.getElementById('thumbnails')

let btnDelete = document.getElementById('btn-deleteProduct')
let idDelete = document.getElementById('id')

socket.on('')
button.addEventListener('click', () => {
    if(title.value.trim().length > 0 || description.value.trim().length > 0 || code.value.trim().length > 0 || category.value.trim().length > 0 ){
        console.log('title esta completo')
        let product = {
            title: title.value,
            description: description.value,
            code: code.value,
            price: parseFloat(price.value), 
            status: true,
            stock: parseInt(stock.value),
            category: category.value,
            thumbnails: [
            thumbnails.value
        ]
        }
        console.log(product)
        socket.emit('productAdded' , {product})
    }else{
        console.log('Empty')
    }
})

//socket.on('')
btnDelete.addEventListener('click', () => {
    
    if(id.value.trim().length !== 0){
        let id = idDelete.value
        const deletForm = document.getElementById('deleteForm')
        deletForm.setAttribute('action', "http://localhost:8080/api/products/"+id)
        socket.on('')
        socket.emit('delete' , {id})
    }else{
        console.log('Empty')
    }
})