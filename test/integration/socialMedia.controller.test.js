const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../../index")
const { sequelize } = require("../../models")

const secretKey = "secret";
let user_id = ''
let token = ''
let socialMediaId = 1
let id_not_found = 0

const user = {
    "email": "dimas@gmail.com",
    "password": "dimas"
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

const socialMediaData = {
    name: "twitter",
    social_media_url: "https://www.twitter.com/",
    user_id: user_id
}

const failedData = {
    name: '',
    social_media_url: 'x',
    user_id: user_id
}

describe('socialMedias getAllSocialMedias', () => {
    it("should return 200 status code", (done) => {
        request(app).get("/socialmedias")
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

describe('socialMedia post socialMedia', () => {
    it("should return 201", (done) => {
        request(app)
            .post('/socialmedias')
            .set('authentication', `${token}`)
            .send(socialMediaData)
            .then(res => {
                expect(res.status).toEqual(201)
                expect(typeof res.body).toEqual("object")
                expect(res.body.socialmedias.social_media_url).toEqual(socialMediaData.social_media_url)
                expect(res.body.socialmedias.name).toEqual(socialMediaData.name)
                expect(typeof res.body.socialmedias.user_id).toEqual("number")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 503 status code", (done) => {
        request(app).post("/socialmedias")
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

describe('socialmedia updatesocialmedia', () => {
    it("should return 200 status code", (done) => {
        request(app).put(`/socialmedias/${socialMediaId}`)
            .set('authentication', `${ token }`)
            .send(socialMediaData)
            .then(res => {
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual("object")
                expect(res.body.socialmedias[0].social_media_url).toEqual(socialMediaData.social_media_url)
                expect(res.body.socialmedias[0].name).toEqual(socialMediaData.name)
                expect(typeof res.body.socialmedias[0].id).toEqual("number")
                done()
            }).catch(error => {
                done(error)
            })
    })

    it("should return 401 status code", (done) => {
        request(app).put(`/socialmedias/${id_not_found}`)
            .set('authentication', `${ token }`)
            .send(socialMediaData)
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
        request(app).put(`/socialmedias/${socialMediaId}`)
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

describe('socialmedias deleteSocialMedia', () => {
    it("should return 200 status code", (done) => {
        request(app).delete(`/socialmedias/${socialMediaId}`)
            .set('authentication', `${ token }`)
            .then(res => {
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual("object")
                done()
            }).catch(error => {
                done(error)
            })
    })

    it("should return 401 status code", (done) => {
        request(app).delete(`/socialmedias/${id_not_found}`)
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
        request(app).delete(`/socialmedias/bukanid`)
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
    sequelize.queryInterface.bulkDelete('socialmedia', null, {
            truncate: true,
            restartIdentity: true
        })
        .then(() => done())
        .catch(error => done(error))
})