const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../../index")
const { sequelize } = require("../../models")

const secretKey = "secret";

const user = {
    "email": "dimas@gmail.com",
    "password": "dimas"
}

let user_id = ''
let photoId = ''
const id_not_found = 0
let token = ''

const photoData = {
    title: "foto wisuda",
    caption: "akan menjadi kebanggaan keluarga",
    poster_image_url: "https://www.twitter.com/",
    user_id: user_id,
}

const failedData = {
    title: "foto wisuda",
    caption: "akan menjadi kebanggaan keluarga",
    poster_image_url: 9224534,
    user_id: "kafsd",
}

beforeAll(done => {
    request(app).post("/users/login")
        .send(user)
        .end((error, res) => {
            if (error) done(error)
            token = res.body.token
            jwt.verify(token, secretKey, (err, decoded) => {
                if (err) {
                    done(err)
                }
                user_id = decoded.id
            });
            done()
        })
})


describe('photos getAllPhotos', () => {
    it("should return 200 status code", (done) => {
        request(app).get("/photos")
            .set('authentication', `${ token }`)
            .then(res => {
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.comment).not.toEqual("number")
                expect(typeof res.body.comment).not.toEqual("boolean")
                expect(typeof res.body.comment).not.toEqual("string")
                done()
            }).catch(error => {
                done(error)
            })
    })
})

describe('photo postPhoto', () => {
    it("should return 201", (done) => {
        request(app)
            .post('/photos')
            .set('authentication', `${token}`)
            .send(photoData)
            .then(res => {
                photoId = res.body.id
                expect(res.status).toEqual(201)
                expect(typeof res.body).toEqual("object")
                expect(res.body.title).toEqual(photoData.title)
                expect(res.body.poster_image_url).toEqual(photoData.poster_image_url)
                expect(res.body.caption).toEqual(photoData.caption)
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 503 status code", (done) => {
        request(app).post("/photos")
            .set('authentication', `${ token }`)
            .send(failedData)
            .then(res => {
                expect(res.status).toEqual(503)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).toEqual("string")
                expect(typeof res.body.message).not.toEqual("number")
                expect(typeof res.status).toEqual("number")
                done()
            }).catch(error => {
                done(error)
            })
    })
})

describe('photo updatePhoto', () => {
    it("should return 200 status code", (done) => {
        request(app).put(`/photos/${photoId}`)
            .set('authentication', `${ token }`)
            .send(photoData)
            .then(res => {
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.photos).toEqual("object")
                expect(typeof res.body.photos).not.toEqual("number")
                expect(typeof res.status).toEqual("number")
                done()
            }).catch(error => {
                done(error)
            })
    })

    it("should return 401 status code id not found", (done) => {
        request(app).delete(`/comments/${id_not_found}`)
            .set('authentication', `${ token }`)
            .then(res => {
                expect(res.status).toEqual(401)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).toEqual("string")
                expect(typeof res.status).toEqual("number")
                expect(res.body.message).toEqual("id not found")
                done()
            }).catch(error => {
                done(error)
            })
    })

    it("should return 503 status code", (done) => {
        request(app).put(`/photos/${photoId}`)
            .set('authentication', `${ token }`)
            .send(failedData)
            .then(res => {
                expect(res.status).toEqual(503)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).not.toEqual("boolean")
                expect(typeof res.body.message).not.toEqual("object")
                expect(typeof res.status).toEqual("number")
                done()
            }).catch(error => {
                done(error)
            })
    })
})


describe('Photo deletephoto', () => {
    it("should return 200 status code", (done) => {
        request(app).delete(`/photos/${photoId}`)
            .set('authentication', `${ token }`)
            .then(res => {
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).toEqual("string")
                expect(res.body.message).toEqual("Your Photo has been succesfully deleted")
                expect(typeof res.status).toEqual("number")
                done()
            }).catch(error => {
                done(error)
            })
    })

    it("should return 401 status code", (done) => {
        request(app).delete(`/photos/${id_not_found}`)
            .set('authentication', `${ token }`)
            .then(res => {
                expect(res.status).toEqual(401)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).toEqual("string")
                expect(typeof res.body.message).not.toEqual("number")
                expect(typeof res.status).toEqual("number")
                done()
            }).catch(error => {
                done(error)
            })
    })

    it("should return 503 status code", (done) => {
        request(app).delete(`/photos/abcdef`)
            .set('authentication', `${ token }`)
            .then(res => {
                expect(res.status).toEqual(503)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).toEqual("string")
                expect(typeof res.body.message).not.toEqual("number")
                expect(typeof res.status).toEqual("number")
                done()
            }).catch(error => {
                done(error)
            })
    })
})

// afterAll(done => {
//     sequelize.queryInterface.bulkDelete('photos', null, {
//             // truncate: true,
//             // restartIdentity: true
//         })
//         .then(() => done())
//         .catch(error => done(error))
// })