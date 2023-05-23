const { Router } = require('express')
const messageModel = require('../Dao/models/message.model')


const router = Router()


router.get('/', async (req, res) => {
    const messages = await messageModel.find().lean().exec()
    res.render('chat', { messages })
})

module.exports = router