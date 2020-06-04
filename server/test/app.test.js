const app = require('../app')
const expect = require('chai').expect
const fixtures = require('./fixtures')
const knex = require('../db/knex')
const request = require('supertest')

describe('crud stickers', () => {
    before((done) => {
        knex.migrate.latest()
            .then(() => {
                return knex.seed.run()
            })
            .then(() => done())
    })

    it('Lists all records', (done) => {
        request(app)
            .get('/api/v1/stickers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).to.deep.equal(fixtures.stickers)
                done()
            })
    })

    it('Show a record by id', (done) => {
        request(app)
            .get('/api/v1/stickers/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).to.deep.equal(fixtures.stickers[0])
                done()
            })
    })

    it('Creates a record', (done) => {
        request(app)
            .post('/api/v1/stickers')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.a('object')
                fixtures.sticker.id = res.body.id
                expect(res.body).to.deep.equal(fixtures.sticker)
                done()
            })
    })

    it('Updates a record', (done) => {
        fixtures.sticker.rating = 5
        request(app)
            .put('/api/v1/stickers/4')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.a('object')
                expect(res.body).to.deep.equal(fixtures.sticker)
                done()
            })
    })

    it('Deletes a record', (done) => {
        request(app)
            .delete('/api/v1/stickers/4')
            .send(fixtures.sticker)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then(res => {
                expect(res.body).to.be.a('object')
                expect(res.body).to.deep.equal({
                    deleted: true
                })
                done()
            })
    })
})