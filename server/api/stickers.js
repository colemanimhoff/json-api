const express = require('express')
const router = express.Router()
const queries = require('../db/queries')

function isValidId(req, res, next) {
    if (!isNaN(req.params.id)) return next()
    const err  = new Error('Bad Request')
    err.status = 400
    return next(err)
}

function validSticker(sticker) {
    const hasDescription = typeof sticker.description == 'string' && sticker.description.trim() != ''
    const hasRating = !isNaN(sticker.rating)
    const hasTitle = typeof sticker.title == 'string' && sticker.title.trim() != ''
    const hasUrl = typeof sticker.url == 'string' && sticker.url.trim() != ''
    return hasDescription && hasRating && hasTitle && hasUrl
}

router.get('/', (req, res) => {
    queries.getAll().then(stickers => {
        return res.json(stickers)
    })
})

router.get('/:id', isValidId, (req, res, next) => {
    queries.getOne(req.params.id)
        .then(sticker => {
            if (sticker) {
                return res.json(sticker)
            }
                res.status(404)
                return next()
        })
})

router.post('/', (req, res, next) => {
    if (validSticker(req.body)) {
        return queries.create(req.body)
            .then(stickers => {
                return res.json(stickers[0])
            })
    }
    return next(new Error('Invalid Sticker'))
})

router.put('/:id', isValidId, (req, res, next) => {
    if(validSticker(req.body)) {
        return queries.update(req.params.id, req.body)
            .then(stickers => {
                return res.json(stickers[0])
            })
    }
    return next(new Error('Invalid Sticker'))
})

router.delete('/:id', isValidId, (req, res) => {
    return queries.delete(req.params.id).then(() => {
        res.json({
            deleted: true,
        })
    })
})

module.exports = router