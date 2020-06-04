const stickers = require('../stickers')

exports.seed = function(knex) {
  return knex('sticker').del()
    .then(function () {
      return knex('sticker').insert(stickers)
    })
}
