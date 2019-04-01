const expect = require('expect')
const request = require('request')
const {ObjectID} = require('mongodb')

const {app} = require('./../index')
// const {router} = require('./../app/controllers/users-controller')
const {User} = require('./../app/models/user')
// const {users, populateUsers} = require

console.log(app)

describe('POST /users' , () => {
    it('should create a user', (done) => {
        var name = 'harsha'
        var email = 'harsha@asdf.com'
        var password = 'asdf'
        var roles = 'admin'

        request(app)
            .post('/')
            .send({name, email, password, roles})
            .expect(200)
            .expect((res) => {
                expect(res.headers['x-auth']).toBeTruthy()
            })
            .end((err) => {
                if (err) {
                    return done(err)
                }
            })

    })
})
