const commentController = require("../../controllers/comment.controllers");
const httpMocks = require("node-mocks-http");
const Comment = require("../../models/index").comment;

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("Comment Controller Get All Comment", () => {
    it("getAllComment should return 200", async() => {
        Comment.findAll.mockResolvedValue({ comments: "comment" });
        await commentController.getAllComment(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("getAllComment should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        Comment.findAll.mockResolvedValue(rejected);
        await commentController.getAllComment(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Comment Controller Post Comment", () => {
    it("postComment should return 401", async() => {
        Comment.findOne.mockResolvedValue(null);
        await commentController.postComment(req, res);
        expect(res.statusCode).toBe(401);
    });
    it("postComments should return 200", async() => {
        const data = {
            comments: "comments",
            photo_id: 1,
        };
        Comment.findOne.mockResolvedValue(data);
        Comment.create.mockResolvedValue({ Comments: "Comment" });
        await commentController.postComment(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("postComments should return 503", async() => {
        const data = {
            comments: "comments",
            photo_id: 1,
        };
        const rejected = Promise.reject({ message: "error" });
        Comment.findOne.mockResolvedValue(data);
        Comment.create.mockResolvedValue(rejected);
        await commentController.postComment(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Comment Controller Update Comment", () => {
    it("updateComment should return 200", async() => {
        Comment.update.mockResolvedValue({ Comment: "Comments" });
        await commentController.updateComments(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("updateComment should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        Comment.update.mockResolvedValue(rejected);
        await commentController.updateComments(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Comment Controller Delete Comment", () => {
    it("deleteComment should return 200", async() => {
        Comment.destroy.mockResolvedValue({ socialmedia: "intagram" });
        await commentController.deleteComments(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("deleteComment should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        Comment.destroy.mockResolvedValue(rejected);
        await commentController.deleteComments(req, res);
        expect(res.statusCode).toBe(503);
    });
});