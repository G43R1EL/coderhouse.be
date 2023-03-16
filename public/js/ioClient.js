const socket = io()

const productsTable = document.getElementById('productsTable')
const addProduct = document.getElementById('addProduct')

const renderProducts = async (products) => {
    const productsTemplate = await (await fetch('productsTable.hbs')).text()
    const template = Handlebars.compile(productsTemplate)
    return template({ products })
}

socket.on('products', (products) => {
    console.log('productos entrando...')
    renderProducts(products).then( data => {
        productsTable.innerHTML = data
    })
})

addProduct.addEventListener('click', (e) => {
    e.preventDefault()
    const product = {
        title: document.getElementById('txtTitle').value,
        description: document.getElementById('txtDescription').value,
        price: document.getElementById('numPrice').value,
        thumbnail: document.getElementById('txtThumbnail').value,
        code: document.getElementById('txtCode').value,
        stock: document.getElementById('numStock').value
    }
    socket.emit('ADD_PRODUCT', product)
})