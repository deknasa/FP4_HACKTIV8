const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../../index")
const { sequelize } = require("../../models")

const secretKey = "secret";

const userData = {
    "email": "dinda@gmail.com",
    "password": "dinda"
}

const userDataFailed = {
    "email": "dika@gmail.com",
    "password": "dika"
}

const userDataFailedlogin = {
    "email": "dikagmail.com",
    "password": 124
}

let userId = ''
const id_not_found = 0
let token = ''
const notAuthorized = 2

const dataRegistrasiFailed = {
    full_name: "dimas",
    email: "dimasgmail.com",
    username: 234345,
    password: "dimas",
    profile_image_url: "https://github.com/",
    age: 45,
    phone_number: 3234534
}

const updateUser = {
    full_name: "dinda",
    email: "dinda@gmail.com",
    username: "dinda",
    profile_image_url: "https://github.com/",
    age: 45,
    phone_number: 3234534
}

const dataRegistrasiNewUser = {
    full_name: "dinda",
    email: "dinda@gmail.com",
    username: "dinda",
    password: "dinda",
    profile_image_url: "https://github.com/",
    age: 45,
    phone_number: 3234534
}

describe('User register', () => {
    it("should return 201", (done) => {
        request(app).post("/users/register")
            .send(dataRegistrasiNewUser)
            .end((err, res) => {
                if (err) {
                    done(err)
                }
                expect(res.status).toEqual(201)
                expect(typeof res.body).toEqual("object")
                expect(res.body.phone_number).toEqual(dataRegistrasiNewUser.phone_number)
                expect(res.body.age).toEqual(dataRegistrasiNewUser.age)
                expect(res.body.username).toEqual(dataRegistrasiNewUser.username)
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
                expect(res.body.message).toEqual("Email or Username Already Exist")
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

describe('User loginUser', () => {
    it("should return 200", (done) => {
        request(app).post("/users/login")
            .send(userData)
            .end((error, res) => {
                if (error) done(error)
                token = res.body.token
                jwt.verify(token, secretKey, (err, decoded) => {
                    userId = decoded.id
                });
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


describe('User updateUser', () => {
    it("should return 200", (done) => {
        request(app).put(`/users/update/${userId}`)
            .send(updateUser)
            .set('authentication', `${token}`)
            .then((res) => {
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(error => done(error))
    })

    it("should return 401", (done) => {
        request(app).put(`/users/update/${id_not_found}`)
            .send(updateUser)
            .set('authentication', `${token}`)
            .then((res) => {
                expect(res.status).toEqual(401)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(error => done(error))
    })

    it("should return 402", (done) => {
        request(app).put(`/users/update/${notAuthorized}`)
            .send(updateUser)
            .set('authentication', `${token}`)
            .then((res) => {
                expect(res.status).toEqual(402)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(error => done(error))
    })

    it("should return 503", (done) => {
        request(app).put(`/users/update/fgsd4`)
            .send(updateUser)
            .set('authentication', `${token}`)
            .then((res) => {
                expect(res.status).toEqual(503)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(error => done(error))
    })
})


describe('User deleteUser', () => {
    it("should return 200", (done) => {
        request(app).delete(`/users/delete/${userId}`)
            .send(updateUser)
            .set('auth', `${token}`)
            .then((res) => {
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(error => done(error))
    })

    it("should return 401", (done) => {
        request(app).delete(`/users/delete/${id_not_found}`)
            .send(updateUser)
            .set('authentication', `${token}`)
            .then((res) => {
                expect(res.status).toEqual(401)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(error => done(error))
    })

    it("should return 402", (done) => {
        request(app).delete(`/users/delete/${notAuthorized}`)
            .send(updateUser)
            .set('authentication', `${token}`)
            .then((res) => {
                expect(res.status).toEqual(402)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(error => done(error))
    })

    it("should return 503", (done) => {
        request(app).delete(`/users/delete/fgsd4`)
            .send(updateUser)
            .set('authentication', `${token}`)
            .then((res) => {
                expect(res.status).toEqual(503)
                expect(typeof res.body).toEqual("object")
                done()
            })
            .catch(error => done(error))
    })
})

// afterAll((done) => {
//     sequelize.queryInterface.bulkDelete('users', null, {
//             truncate: true,
//             restartIdentity: true
//         })
//         .then(() => done())
//         .catch(error => done(error))
// })