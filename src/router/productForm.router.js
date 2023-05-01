const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    console.log('Product Form...')
    res.status(200).render('productForm')
})

module.exports = router