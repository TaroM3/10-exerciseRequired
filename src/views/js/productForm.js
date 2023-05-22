let socket = io()

let button = document.getElementById('addProduct')
let title = document.getElementById('titleAdd')
let description = document.getElementById('descriptionAdd')
let code = document.getElementById('codeAdd')
let status = document.getElementById('statusAdd')
let category = document.getElementById('categoryAdd')
let thumbnails = document.getElementById('thumbnailsAdd')
let price = document.getElementById('priceAdd')
let stock = document.getElementById('stockAdd')

let btnDelete = document.getElementById('btn-deleteProduct')
let idDelete = document.getElementById('idDelete')

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
    
    if(idDelete.value.trim().length !== 0){
        let id = parseInt(idDelete.value)
        //const deletForm = document.getElementById('deleteForm')
        //deletForm.setAttribute('action', "http://localhost:8080/api/products/"+id)
        socket.on('')
        socket.emit('delete' , {id})
    }else{
        console.log('Empty')
    }
})