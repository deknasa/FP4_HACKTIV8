const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../../index")
const { sequelize } = require("../../models")

const secretKey = "secret";

const adminUser = {
    "email": "admin@admin.com",
    "password": "admin"
}

const comment = ''
let user_id = ''
const photo_id = 2
let token = ''

const commentData = {
    comment: comment,
    user_id: user_id,
    photo_id: photo_id
}

const failedData = {
    comment: '',
    user_id: user_id,
    photo_id: photo_id
}

const failedCommentData = {
    photo_id
}

beforeAll(done => {
    request(app).post("/users/login")
        .send(adminUser)
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

describe('comment controller get all comments', () => {
    it("should return 200 status code", (done) => {
        request(app).get("/comments")
        .set('authentication', `${ token }`)
        .then(res => {
            expect(res.status).toEqual(200)
            expect(typeof res.body).toEqual("object")
            done()
        })
        .catch(e => {
            done(e)
        })
    })
    // it("should return 503 status code", (done) => {
    //     request(app).get("/comments")
    //     .set('authentication', `${ token }`)
    //     .then(res => {
    //         expect(res.status).toEqual(503)
    //         expect(typeof res.body).toEqual("object")
    //         done()
    //     })
    //     .catch(e => {
    //         done(e)
    //     })
    // })
})


describe('comment post Comment', () => {
    it("should return 201 status code", (done) => {
        request(app)
        .post("/comments")
        .set('authentication', `${ token }`)
        .send(commentData)
        .then(res => {
            expect(res.status).toEqual(201)
            expect(typeof res.body).toEqual("object")
            expect(res.body.comment.photo_id).toEqual(commentData.photo_id)
            expect(typeof res.body.comment.user_id).toEqual("number")
            expect(res.body.comment.comment).toEqual(commentData.comment)
            done()
        }).catch(error => {
            done(error)
        })
    })
    it("should return 401 status code", (done) => {
        request(app)
        .post("/comments")
        .set('authentication', `${ token }`)
        .send(failedCommentData)
        .then(res => {
            expect(res.status).toEqual(401)
            expect(typeof res.body).toEqual("object")
            done()
        })
        .catch(e => {
            done(e)
        })
    })
    it("should return 503 status code", (done) => {
        request(app)
        .post("/comments")
        .set('authentication', `${ token }`)
        .send(failedData)
        .then(res => {
            expect(res.status).toEqual(503)
            expect(typeof res.body).toEqual("object")
            done()
        })
        .catch(e => {
            done(e)
        })
    })
})

describe('comment controller update comment', () => {
    it("should return 200 status code", (done) => {
        request(app)
        .put(`/comments/${photo_id}`)
        .set('authentication', `${ token }`)
        .send(commentData)
        .then(res => {
            expect(res.status).toEqual(200)
            expect(typeof res.body).toEqual("object")
                // expect(res.body.comment.photo_id).toEqual(commentData.photo_id)
                // expect(res.body.comment.comment).toEqual(commentData.comment)
                // expect(typeof res.body.comment.user_id).toEqual("number")
            done()
        })
        .catch(e => {
            done(e)
        })
    })
    it("should return 503 status code", () => {
        request(app)
        .put(`/comments/${photo_id}`)
        .set('authentication', `${ token }`)
        .send(failedData)
        .then(res => {
            expect(res.status).toEqual(503)
            expect(typeof res.body).toEqual("object")
            done()
        })
        .catch(e => {
            done(e)
        })
    })
})

describe('comment controller delete comment', () => {
    it("should return 200 status code", (done) => {
        request(app)
        .delete(`/comments/${photo_id}`)
        .set('authentication', `${token}`)
        .then(res => {
            expect(res.status).toEqual(200)
            expect(typeof res.body).toEqual("object")
            done()
        })
        .catch(e => {
            done(e)
        })
    })
    it("should return 503 status code", (done) => {
        request(app)
        .delete(`/comments/${photo_id}`)
        .set('authentication', `${token}`)
        .then(res => {
            expect(res.status).toEqual(503)
            expect(typeof res.body).toEqual("object")
            done()
        })
        .catch(e => {
            done(e)
        })
    })
})

afterAll(done => {
    sequelize.queryInterface.bulkDelete('comments', null, {
        truncate: true,
        restartIdentity: true
    })
    .then(() => done())
    .catch(error => done(error))
})
 