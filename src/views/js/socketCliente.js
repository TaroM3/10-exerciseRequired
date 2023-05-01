console.log('Hola mundo')
//const ProductManager = require('../../helpers/ProductManager')
const socket = io()
//const products = new ProductManager()
/*
function addElement(title){
    const newDiv = document.createElement('div')
    const  newCon = document.createTextNode(title)
    newDiv.
    document.body.appendChild(newDiv)
}*/
socket.on ('logs', data => {
    console.log(data)
    //const container = document.querySelector("#container")

    //let list = container.children()


    //console.log(list)
    const container = document.getElementById("container") 
    const newTitle = document.createElement("p")
    
    //products.getAllProducts().then(product => {})
    let arrayQuery = Object.values(data)
    let product = {
        title: arrayQuery[0],
        description: arrayQuery[1],
        code: arrayQuery[2],
        price: parseFloat(arrayQuery[3]), 
        status: true,
        stock: parseInt(arrayQuery[5]),
        thumbnails: [
            arrayQuery[6]
        ]
    }
    newTitle.textContent = JSON.stringify(arrayQuery[0])
    container.appendChild(newTitle)
    
    //addElement(product.title)
   // window.location.reload(true)
    
})

