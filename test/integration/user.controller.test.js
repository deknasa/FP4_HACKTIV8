const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../../index")
const { sequelize } = require("../../models")

const secretKey = "secret";

const userData = {
    "email": "tanjiro@gmail.com",
    "password": "tanjiro"
}

const userDataFailed = {
    "email": "nezzz@gmail.com",
    "password": "nezzz"
}

const userDataFailedlogin = {
    "email": "tanjirogmail.com",
    "password": 124
}

let userId = ''
const id_not_found = 0
let token = ''
const notAuthorized = 1

const dataRegistrasiFailed = {
    full_name: "tanjiro",
    email: "tanjirogmail.com",
    username: 234345,
    password: "tanjiro",
    profile_image_url: "https://github.com/",
    age: 45,
    phone_number: 3234534
}

const updateUser = {
    full_name: "tanjiro",
    email: "tanjiro@gmail.com",
    username: "tanjiro",
    profile_image_url: "https://github.com/",
    age: 45,
    phone_number: 3234534
}

const dataRegistrasiNewUser = {
    full_name: "tanjiro",
    email: "tanjiro@gmail.com",
    username: "tanjiro",
    password: "tanjiro",
    profile_image_url: "https://github.com/",
    age: 17,
    phone_number: 888
}

describe('User Controller Register', () => {
    it("should return 201", (done) => {
        request(app)
        .post("/users/register")
        .send(dataRegistrasiNewUser)
        .end((err, res) => {
            if (err) {
                done(err)
            }
            userId = res.body.user.id
            console.log(userId)
            console.log(res.body)
            expect(res.status).toEqual(201)
            expect(typeof res.body).toEqual("object")
            expect(res.body.user.phone_number).toEqual(dataRegistrasiNewUser.phone_number)
            expect(res.body.user.age).toEqual(dataRegistrasiNewUser.age)
            expect(res.body.user.username).toEqua(dataRegistrasiNewUser.username)
            done()
        })
    })

    it("should return 400", (done) => {
        request(app)
            .post('/users/register')
            .send(dataRegistrasiNewUser)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(400)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).toEqual("string")
                expect(res.body.message).toEqual("Email or username already Exist")
                expect(typeof res.status).toEqual("number")
                done()
            })
    })

    it("should return 503", (done) => {
        request(app)
        .post('/users/register')
        .send(dataRegistrasiFailed)
        .end((err, res) => {
            if (err) {
                done(err)
            }
            expect(res.status).toEqual(503)
            expect(typeof res.body).toEqual("object")
            expect(typeof res.body.message).toEqual("string")
            expect(typeof res.body.message).not.toEqual("number")
            expect(typeof res.status).toEqual("number")
            done()
        })
    })
})


describe('User Controller Login', () => {
    it("should return 200", (done) => {
        request(app).post("/users/login")
        .send(userData)
        .end((error, res) => {
            if (error) done(error)
            token = res.body.token
            expect(res.status).toEqual(200)
            expect(typeof res.body).toEqual("object")
            expect(typeof res.body.token).toEqual("string")
            expect(typeof res.body.token).not.toEqual("object")
            expect(typeof res.status).toEqual("number")
            done()
        })
    })

    it("should return 401", (done) => {
        request(app).post("/users/login")
        .send(userDataFailed)
        .end((error, res) => {
            if (error) done(error)
            token = res.body.token
            expect(res.status).toEqual(401)
            expect(typeof res.body).toEqual("object")
            expect(typeof res.body).not.toEqual("string")
            expect(typeof res.body).not.toEqual("text")
            expect(typeof res.status).toEqual("number")
            done()
        })
    })

    it("should return 503", (done) => {
        request(app).post("/users/login")
        .send(userDataFailedlogin)
            .end((error, res) => {
            if (error) done(error)
            token = res.body.token
            expect(res.status).toEqual(401)
            expect(typeof res.body).toEqual("object")
            expect(typeof res.body.message).toEqual("string")
            expect(typeof res.body.message).not.toEqual("number")
            expect(typeof res.status).toEqual("number")
            done()
        })
    })
})


describe('User Controller Update User', () => {
    it("should return 200", (done) => {
        request(app).put(`/users/update/${userId}`)
        .send(updateUser)
        .set('authentication', `${token}`)
        .end((error, res) => {
            if (error) done(error)
            expect(res.status).toEqual(200)
            expect(typeof res.body).toEqual("object")
            done()
        })
    })
    // it("should return 401", (done) => {
    //     request(app).put(`/users/update/${id_not_found}`)
    //         .send(updateUser)
    //         .set('authentication', `${token}`)
    //         .end((error, res) => {
    //             if (error) done(error)
    //             token = res.body.token
    //             expect(res.status).toEqual(401)
    //             expect(typeof res.body).toEqual("object")
    //             done()
    //         })
    // })

    // it("should return 503", (done) => {
    //     request(app).put(`/users/update/fgsd4`)
    //         .send(updateUser)
    //         .set('authentication', `${token}`)
    //         .end((error, res) => {
    //             if (error) done(error)
    //             token = res.body.token
    //             expect(res.status).toEqual(503)
    //             expect(typeof res.body).toEqual("object")
    //             done()
    //         })
    // })
})

describe('User Controller Delete User', () => {
    it("should return 200", (done) => {
        request(app).delete(`/users/delete/${userId}`)
        .send(updateUser)
        .set('auth', `${token}`)
        .end((error, res) => {
            if (error) done(error)
            expect(res.status).toEqual(200)
            expect(typeof res.body).toEqual("object")
            done()
        })
    })

    it("should return 401", (done) => {
        request(app).delete(`/users/delete/${id_not_found}`)
        .send(updateUser)
        .set('authentication', `${token}`)
        .end((error, res) => {
            if (error) done(error)
            token = res.body.token
            expect(res.status).toEqual(401)
            expect(typeof res.body).toEqual("object")
            done()
        })
    })

    it("should return 503", (done) => {
        request(app).delete(`/users/delete/fgsd4`)
        .send(updateUser)
        .set('authentication', `${token}`)
        .end((error, res) => {
            if (error) done(error)
            token = res.body.token
            expect(res.status).toEqual(503)
            expect(typeof res.body).toEqual("object")
            done()
        })
    })
})

afterAll((done) => {
    sequelize.queryInterface.bulkDelete('users', null, {
        truncate: true,
        restartIdentity: true
    })
    .then(() => done())
    .catch(error => done(error))
})