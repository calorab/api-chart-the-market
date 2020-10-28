const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

const {makeInvestmentArray} = require('./investment.fixtures')

let db 

before('make knex instance', () => {
    db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
})

after('disconnect from db', () => db.destroy())

before('clean the table', () => db('investments').truncate())

afterEach('cleanup', () => db('investments').truncate())

describe('GET /investment/investment_id', function() {

    context(`Given no investments`, () => {
        it(`responds with 404`, () => {
            const investmentId = 123456
            return supertest(app)
                .get(`/portfolio/investment/${investmentId}`)
                .expect(404, { error: { message: `Investment doesn't exist` } })
        })
    })

    context('Given there are investents in the DB', () => {
        const testInvestments = makeInvestmentArray()

        beforeEach('insert investments', () => {
            return db
                .into('investments')
                .insert(testInvestments)
        })

        it('GET /portfolio/investment/investment_Id responds with 200 and the specified investment', () => {
            const investmentId = 2
            const expectedInvestment = testInvestments[investmentId - 1]
            return supertest(app)
                .get(`/portfolio/investment/${investmentId}`)
                .expect(200, expectedInvestment)
        })
    })
})

describe(' GET /investments', function() {

    context('given there are no investments in the database', () => {
        it(`responds with 200 and an empty list`, () => {
            return supertest(app)
                .get('/portfolio/investments')
                .expect(200, [])
        })
    })

    context('Given there are investments in the database', () => {
        const testInvestments = makeInvestmentArray()
        
        beforeEach('insert investments', () => {
            return db
                .into('investments')
                .insert(testInvestments)
        })

        it('GET /portfolio/investments responds with 200 and all of the investments', () => {
            return supertest(app)
                .get('/portfolio/investments')
                .expect(200, testInvestments)
                // TODO: add more assertions about the body
        })

        
    })
})

// ------------------------ POST ENDPOINTS ---------------------------

describe.only(`POST /investment`, () => {
    it(`creates an investment, responding with 201 and the new investment`,  () => {
        const newInvestment = {
            symbol: 'GOOG', 
            shares: 100, 
            buy_date: new Date().toLocaleString(), 
            value_at_buy_date: 314,
        }
        console.log('BUY DATE: ', newInvestment.buy_date)
        return supertest(app)
            .post('/portfolio/investment')
            .send(newInvestment)
            .expect(201)
            .expect(res => {
                expect(res.body.symbol).to.eql(newInvestment.symbol)
                expect(res.body.shares).to.eql(newInvestment.shares)
                expect(res.body.buy_date).to.eql(newInvestment.buy_date)
                expect(res.body.value_at_buy_date).to.eql(newInvestment.value_at_buy_date)
                expect(res.body).to.have.property('id')
                const expected = new Date().toLocaleString()
                const actual = new Date(res.body.buy_date).toLocaleString()
                expect(actual).to.eql(expected)
            })
    })
})
    