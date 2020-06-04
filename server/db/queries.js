const knex = require('./knex') // relative path to connection

module.exports = {

    create(sticker) {
        return knex('sticker').insert(sticker, '*')
    },
    delete(id) {
        return knex('sticker').where('id', id).del()
    },
    getAll() {
        return knex('sticker')
    },
    getOne(id) {
        return knex('sticker').where('id', id).first()
    },
    update(id, sticker) {
        return knex('sticker').where('id', id).update(sticker, '*')
    }
}

