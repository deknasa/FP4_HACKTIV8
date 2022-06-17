const jwt = require("jsonwebtoken")
const request = require("supertest")
const app = require("../../index")
const { sequelize } = require("../../models")

const secretKey = "secret";

const user = {
    "email": "tanjiro@gmail.com",
    "password": "tanjiro"
}

let commentId = ''
const comment = 'comment'
let user_id = ''
const photo_id = 1 // seeding photo terlebih dahulu
let token = ''
let id_not_found = 0;

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
    photo_id: 0,
    comment
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

// describe('comment getAll comment', () => {
//     it("should return 200 status code", (done) => {
//         request(app).get("/comments")
//         .set('authentication', `${ token }`)
//         .then(res => {
//             expect(res.status).toEqual(200)
//             expect(typeof res.body).toEqual("object")
//             expect(typeof res.body.comment).not.toEqual("number")
//             expect(typeof res.body.comment).not.toEqual("boolean")
//             expect(typeof res.body.comment).not.toEqual("string")
//             done()
//         }).catch(error => {
//             done(error)
//         })
//     })
// })

// describe('comment postComment', () => {
//     it("should return 201 status code", (done) => {
//         request(app)
//         .post("/comments")
//         .set('authentication', `${ token }`)
//         .send(commentData)
//         .then(res => {
//             comment_id = res.body.comment.id
//             expect(res.status).toEqual(201)
//             expect(typeof res.body).toEqual("object")
//             expect(res.body.comment.photo_id).toEqual(commentData.photo_id)
//             expect(res.body.comment.comment).toEqual(commentData.comment)
//             expect(typeof res.body.comment.user_id).toEqual("number")
//             done()
//         }).catch(error => {
//             done(error)
//         })
//     })

//     it("should return 401 status code", (done) => {
//         request(app)
//         .post('/comments')
//         .set('auth', `${token}`)
//         .send(failedCommentData)
//         .then(res => {
//             expect(res.status).toEqual(401)
//             expect(typeof res.body).toEqual("object")
//             expect(typeof res.body.message).not.toEqual("object")
//             expect(typeof res.body.message).not.toEqual("number")
//             expect(typeof res.status).toEqual("number")
//             done()
//         })
//         .catch(err => {
//             done(err)
//         })
//     })

//     it("should return 503 status code", (done) => {
//         request(app)
//         .post("/comments")
//         .set('authentication', `${ token }`)
//         .send(failedData)
//         .then(res => {
//             expect(res.status).toEqual(503)
//             expect(typeof res.body).toEqual("object")
//             expect(typeof res.body.message).toEqual("string")
//             expect(typeof res.body.message).not.toEqual("number")
//             expect(typeof res.status).toEqual("number")
//             done()
//         }).catch(error => {
//             done(error)
//         })
//     })
// })

// describe('comment updateComment', () => {
//     it("should return 200 status code", (done) => {
//         request(app)
//         .put(`/comments/${photo_id}`)
//         .set('authentication', `${ token }`)
//         .send(commentData)
//         .then(res => {
//             expect(res.status).toEqual(200)
//             expect(typeof res.body).toEqual("object")
//             expect(typeof res.body.comments).toEqual("object")
//             expect(typeof res.body.comments).not.toEqual("number")
//             expect(typeof res.status).toEqual("number")
//             done()
//         }).catch(error => {
//             done(error)
//         })
//     })
//     it("should return 401 status code id not found", (done) => {
//         request(app)
//         .put(`/comments/${id_not_found}`)
//         .set('authentication', `${ token }`)
//         .then(res => {
//             expect(res.status).toEqual(401)
//             expect(typeof res.body).toEqual("object")
//             expect(typeof res.body.message).toEqual("string")
//             expect(typeof res.status).toEqual("number")
//             expect(res.body.message).toEqual("id not found")
//             done()
//         }).catch(error => {
//             done(error)
//         })
//     })
//     it("should return 503 status code", (done) => {
//         request(app)
//         .put(`/comments/${photo_id}`)
//         .set('authentication', `${ token }`)
//         .send(failedData)
//         .then(res => {
//             expect(res.status).toEqual(503)
//             expect(typeof res.body).toEqual("object")
//             expect(typeof res.body.message).toEqual("string")
//             expect(typeof res.body.message).not.toEqual("object")
//             expect(typeof res.status).toEqual("number")
//             done()
//         }).catch(error => {
//             done(error)
//         })
//     })
// })

// describe('comment deleteComment', () => {
//     it("should return 200 status code", (done) => {
//         request(app)
//         .delete(`/comments/${photo_id}`)
//         .set('authentication', `${ token }`)
//         .then(res => {
//             expect(res.status).toEqual(200)
//             expect(typeof res.body).toEqual("object")
//             expect(typeof res.body.message).toEqual("string")
//             expect(res.body.message).toEqual("Your comments has been succesfully deleted")
//             expect(typeof res.status).toEqual("number")
//             done()
//         }).catch(error => {
//             done(error)
//         })
//     })
//     it("should return 401 status code id not found", (done) => {
//         request(app)
//         .delete(`/comments/${id_not_found}`)
//         .set('authentication', `${ token }`)
//         .then(res => {
//             expect(res.status).toEqual(401)
//             expect(typeof res.body).toEqual("object")
//             expect(typeof res.body.message).toEqual("string")
//             expect(typeof res.status).toEqual("number")
//             expect(res.body.message).toEqual("id not found")
//             done()
//         }).catch(error => {
//             done(error)
//         })
//     })
//     it("should return 503 status code", (done) => {
//         request(app)
//         .delete(`/comments/bukanId`)
//         .set('authentication', `${ token }`)
//         .then(res => {
//             expect(res.status).toEqual(503)
//             expect(typeof res.body).toEqual("object")
//             expect(typeof res.body.message).toEqual("string")
//             expect(typeof res.body.message).not.toEqual("number")
//             expect(typeof res.status).toEqual("number")
//             done()
//         }).catch(error => {
//             done(error)
//         })
//     })
// })



describe('comment getAll comment', () => {
    it("should return 200 status code", (done) => {
        request(app).get("/comments")
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

describe('comment postComment', () => {
    it("should return 201 status code", (done) => {
        request(app).post("/comments")
            .set('authentication', `${ token }`)
            .send(commentData)
            .then(res => {
                commentId = res.body.comment.id
                expect(res.status).toEqual(201)
                expect(typeof res.body).toEqual("object")
                expect(res.body.comment.photo_id).toEqual(commentData.photo_id)
                expect(res.body.comment.comment).toEqual(commentData.comment)
                expect(typeof res.body.comment.user_id).toEqual("number")
                done()
            }).catch(error => {
                done(error)
            })
    })

    it("should return 401 status code", (done) => {
        request(app)
            .post('/comments')
            .set('authentication', `${token}`)
            .send(failedCommentData)
            .then(res => {
                expect(res.status).toEqual(401)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).not.toEqual("object")
                expect(typeof res.body.message).not.toEqual("number")
                expect(typeof res.status).toEqual("number")
                done()
            })
            .catch(err => {
                done(err)
            })
    })

    it("should return 503 status code", (done) => {
        request(app).post("/comments")
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

describe('comment updateComment', () => {
    it("should return 200 status code", (done) => {
        request(app).put(`/comments/${commentId}`)
            .set('authentication', `${ token }`)
            .send(commentData)
            .then(res => {
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.comment).toEqual("object")
                expect(typeof res.body.comment).not.toEqual("number")
                expect(typeof res.status).toEqual("number")
                done()
            }).catch(error => {
                done(error)
            })
    })

    it("should return 401 status code id not found", (done) => {
        request(app).put(`/comments/${id_not_found}`)
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
        request(app).put(`/comments/kejre`)
            .set('authentication', `${ token }`)
            .send(failedData)
            .then(res => {
                expect(res.status).toEqual(503)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).toEqual("string")
                expect(typeof res.body.message).not.toEqual("object")
                expect(typeof res.status).toEqual("number")
                done()
            }).catch(error => {
                done(error)
            })
    })
})

describe('comment deleteComment', () => {
    it("should return 200 status code", (done) => {
        request(app).delete(`/comments/${commentId}`)
            .set('authentication', `${ token }`)
            .then(res => {
                expect(res.status).toEqual(200)
                expect(typeof res.body).toEqual("object")
                expect(typeof res.body.message).toEqual("string")
                expect(res.body.message).toEqual("Your comments has been succesfully deleted")
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
        request(app).delete(`/comments/bukanid`)
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
    sequelize.queryInterface.bulkDelete('comments', null, {
        truncate: true,
        restartIdentity: true
    })
    .then(() => done())
    .catch(error => done(error))
})