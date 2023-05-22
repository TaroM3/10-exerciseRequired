// console.log('Hola mundo')
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
    console.log(JSON.stringify(data))
    //const container = document.querySelector("#container")

    //let list = container.children()


    //console.log(list)
    const container = document.getElementById("container") 
    const newTitle = document.createElement("p")
    
    //products.getAllProducts().then(product => {})
    let arrayQuery = Object.values(data.product)
    let product = {
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
    //const text = document.createTextNode(JSON.stringify(arrayQuery[1]))
    //newTitle.appendChild(text)
    const dataEntries = Object.entries(product)
    let title = dataEntries[0][1]
    console.log(title)
    console.log(dataEntries[0][1])

    //getting the last product id
    const lastProduct = container.lastElementChild
    const id = lastProduct.getAttribute('id')
    const newId =+ id+1
    
    //div-container "product id" 
    const divId = document.createElement('div')
    divId.setAttribute('id', newId)

    //h2 Id
    const h2Id = document.createElement('h2')
    const h2IdText = document.createTextNode('Id: ')
    const iId = document.createElement('i')
    iId.setAttribute('id', 'id')
    const iIdText = document.createTextNode(newId)
    
    iId.appendChild(iIdText)
    h2Id.appendChild(h2IdText)
    h2Id.appendChild(iId)
    
    divId.appendChild(h2Id)

    //h2 product
    const h2Product = document.createElement('h2')
    const h2ProductText = document.createTextNode('Product: ')
    const iProduct = document.createElement('i')
    iId.setAttribute('id', 'title')
    const iProductText = document.createTextNode(data.product.title)
    
    iProduct.appendChild(iProductText)
    h2Product.appendChild(h2ProductText)
    h2Product.appendChild(iProduct)
    
    divId.appendChild(h2Product)
    //description
    const pDescription = document.createElement('p')
    const pDescriptionText = document.createTextNode('Description: ')
    pDescription.appendChild(pDescriptionText)
    const iDescription = document.createElement('i')
    const iDescriptionText = document.createTextNode(data.product.description)
    iDescription.appendChild(iDescriptionText)
    
    pDescription.appendChild(iDescription)

    divId.appendChild(pDescription)

    //code
    const pCode = document.createElement('p')
    const pCodeText = document.createTextNode('Code: ')
    pCode.appendChild(pCodeText)
    const iCode = document.createElement('i')
    const iCodeText = document.createTextNode(data.product.code)
    iCode.appendChild(iCodeText)

    pCode.appendChild(iCode)

    divId.appendChild(pCode)

    //price
    const pPrice = document.createElement('p')
    const pPriceText = document.createTextNode('Price: ')
    pPrice.appendChild(pPriceText)
    const iPrice = document.createElement('i')
    const iPriceText = document.createTextNode(data.product.price)
    iPrice.appendChild(iPriceText)
    
    pPrice.appendChild(iPrice)

    divId.appendChild(pPrice)
    
    //stock
    const pStock = document.createElement('p')
    const pStockText = document.createTextNode('Stock: ')
    pStock.appendChild(pStockText)
    const iStock = document.createElement('i')
    const iStockText = document.createTextNode(data.product.stock)
    iStock.appendChild(iStockText)

    pStock.appendChild(iStock)

    divId.appendChild(pStock)

    //category
    const pCategory = document.createElement('p')
    const pCategoryText = document.createTextNode('Category: ')
    pCategory.appendChild(pCategoryText)
    const iCategory = document.createElement('i')
    const iCategoryText = document.createTextNode(data.product.category)
    iCategory.appendChild(iCategoryText)

    pCategory.appendChild(iCategory)

    divId.appendChild(pCategory)

    //thumbnails
    const pThumbnails =  document.createElement('p')
    const imgThumbnails = document.createElement('img')
    imgThumbnails.setAttribute('src', data.product.thumbnails[0])

    pThumbnails.appendChild(imgThumbnails)

    divId.appendChild(pThumbnails)
    
    
    container.appendChild(divId)
    
    console.log(id)
    //divId.setAttribute('id', '4' ) 
    //container.appendChild(newTitle)
    
})

socket.on('productDeleted', id => {
    const productDeleted = document.getElementById(id.id)
    if(productDeleted !== null){
        productDeleted.remove()
    }
})

