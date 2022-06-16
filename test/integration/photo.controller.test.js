const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../../index")
const { sequelize } = require("../../models")

const user = {
    "email": "tanjiro@gmail.com",
    "password": "tanjiro"
}

const secretKey = "secret";
let token = ''
let user_id = ''
let photo_id = ""
const id_not_found = 0

const photoData = {
    title: "nezuko",
    caption: "nezuko",
    poster_image_url: "https://www.nezuko.com/",
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

describe('Photo Controller Get All Photo', () => {
    it("should return 200", (done) => {
        request(app)
        .get("/photos")
        .set('authentication', `${ token }`)
        .then(res => {
            expect(res.status).toEqual(200)
            expect(typeof res.body).toEqual("object")
            expect(typeof res.body.photo).not.toEqual("number")
            expect(typeof res.body.photo).not.toEqual("boolean")
            expect(typeof res.body.photo).not.toEqual("string")
            done()
        }).catch(error => {
            done(error)
        })
    })
})

describe('Photo Controller Post Photo', () => {
    it("should return 201", (done) => {
        request(app)
        .post('/photos')
        .set('authentication', `${token}`)
        .send(photoData)
        .then(res => {
            photo_id = res.body.id
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
        request(app)
        .post("/photos")
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

describe('Photo Controller Update Photo', () => {
    it("should return 200", (done) => {
        request(app)
        .put(`/photos/${photo_id}`)
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
    it("should return 401 id not found", (done) => {
        request(app)
        .put(`/photos/${id_not_found}`)
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
    it("should return 503", (done) => {
        request(app)
        .put(`/photos/${photo_id}`)
        .set('authentication', `${ token }`)
        .send(failedData)
        .then(res => {
            expect(res.status).toEqual(503)
            expect(typeof res.body).toEqual("object")
            expect(typeof res.body.msg).toEqual("string")
            expect(typeof res.body.msg).not.toEqual("object")
            expect(typeof res.status).toEqual("number")
            done()
        }).catch(error => {
            done(error)
        })
    })
})

describe('Photo Controller Delete Photo', () => {
    it("should return 200", (done) => {
        request(app)
        .delete(`/photos/${photo_id}`)
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
    it("should return 401 id not found", (done) => {
        request(app)
        .delete(`/photos/${id_not_found}`)
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
        request(app)
        .delete(`/photos/bukanId`)
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

afterAll(done => {
    sequelize.queryInterface.bulkDelete('photos', null, {
            truncate: true,
            restartIdentity: true
        })
        .then(() => done())
        .catch(error => done(error))
})