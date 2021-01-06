// // ------------------------ POST ENDPOINTS ---------------------------

// describe(`POST /investment`, () => {
//     it(`creates an investment, responding with 201 and the new investment`,  () => {
//         const newInvestment = {
//             symbol: 'GOOG', 
//             shares: 100, 
//             buy_date: new Date().toLocaleString(), 
//             value_at_buy_date: 314,
//         }
//         console.log('BUY DATE: ', newInvestment.buy_date)
//         return supertest(app)
//             .post('/portfolio/investment')
//             .send(newInvestment)
//             .expect(201)
//             .expect(res => {
//                 expect(res.body.symbol).to.eql(newInvestment.symbol)
//                 expect(res.body.shares).to.eql(newInvestment.shares)
//                 expect(res.body.buy_date).to.eql(newInvestment.buy_date)
//                 expect(res.body.value_at_buy_date).to.eql(newInvestment.value_at_buy_date)
//                 expect(res.body).to.have.property('id') // below is correct but the toLocaleString() isn't working CALEB
//                 // const expected = new Date().toLocaleString()
//                 // const actual = new Date(res.body.buy_date).toLocaleString()
//                 // expect(actual).to.eql(expected)
//             })
//     })

//     const requiredFields = ['symbol', 'shares', 'buy_date', 'value_at_buy_date']

//     requiredFields.forEach(field => {
//         const newInvestment = {
//             symbol: 'GOOG', 
//             shares: 100, 
//             buy_date: new Date().toLocaleString(), 
//             value_at_buy_date: 314,
//         }
//         it(`responds with 400 and an error message when the ${field} is missing`, () => {
//             delete newInvestment[field]

//             return supertest(app)
//             .post('/portfolio/investment')
//             .send(newInvestment)
//             .expect(400, {
//                 error: { message: `Missing ${field} in request body` }
//             })
//         })

//     })
// })

// // STILL NEEDS TESTING CALEB
// describe(`DELETE /delete-investment/:investment-id`, () => {
//     context('Given there are investments in the database', () => {
//         const testinvestments = makeInvestmentArray()

//         beforeEach('insert investments', () => {
//         return db
//             .into('investments')
//             .insert(testinvestments)
//         })

//         it('responds with 204 and removes the article', () => {
//         const idToRemove = 2
//         const expectedInvestments = testinvestments.filter(investment => investment.id !== idToRemove)
//         return supertest(app)
//             .delete(`/portfolio/delete-investment/${idToRemove}`)
//             .expect(204)
//             .then(res =>
//             supertest(app)
//                 .get(`portfolio/investments`)
//                 .expect(expectedInvestments)
//             )
//         })
//     })

//     context(`Given no articles`, () => {
//         it(`responds with 404`, () => {
//             const investmentId = 123456
//             return supertest(app)
//                 .delete(`/portfolio/delete-investment/${investmentId}`)
//                 .expect(404, { error: { message: `Investment doesn't exist` } })
//         })
//     })
// })
    