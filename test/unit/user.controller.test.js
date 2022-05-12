const userController = require("../../controllers/user.controllers");
const httpMocks = require("node-mocks-http");
const bcrypt = require("bcrypt");
const User = require("../../models/index").user;
const generate = require("../../middleware/authentication").generateToken;

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    bcrypt.compareSync = jest.fn().mockImplementation(() => true);
});

describe("userController signUP", () => {
    beforeAll(() => {
        bcrypt.hashSync = jest.fn();
        generate.mockReturnValue("get Token");
    });

    it("signUp should return 400 ", async() => {
        const email = "email@gmail.com";
        User.findOne.mockResolvedValue({ rows: [email] });
        await userController.register(req, res);
        expect(res.statusCode).toBe(400);
    });

    it("signUp should return 200 ", async() => {
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({ name: "user" });
        await userController.register(req, res);
        expect(res.statusCode).toBe(201);
    });

    it("signUp should return error 503 test", async() => {
        const rejected = Promise.reject({ message: "can't sign up" });
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(rejected);
        await userController.register(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("userController signIn", () => {
    beforeAll(() => {
        bcrypt.hashSync = jest.fn();
        generate.mockReturnValue("get Token");
    });

    it("sign should return 401 if email not found", async() => {
        User.findOne.mockResolvedValue(null);
        await userController.login(req, res);
        expect(res.statusCode).toBe(401);
    });

    it("sign should return 401 if password not match", async() => {
        const data = {
            email: "email",
            password: "wrongpassword",
        };
        User.findOne.mockResolvedValue(data);
        bcrypt.compareSync = jest.fn().mockImplementation(() => false);
        await userController.login(req, res);
        expect(res.statusCode).toBe(403);
    });

    it("sign in should return 200 ", async() => {
        User.findOne.mockResolvedValue({ user: "login" });
        userController.login(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("signIn should return 503", async() => {
        const rejected = Promise.reject({ message: "can't sign in" });
        User.findOne.mockResolvedValue(rejected);
        await userController.login(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("userController updateUser", () => {
    it("sign should return 200 updated", async() => {
        User.update.mockResolvedValue({ user: "user" });
        await userController.updateUser(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("sign should return 503", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        User.update.mockResolvedValue(rejected);
        await userController.updateUser(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("userController deleteUser", () => {
    it("sign should return 200 deleted", async() => {
        User.destroy.mockResolvedValue({ user: "user" });
        await userController.deleteUser(req, res);
        expect(res.statusCode).toBe(200);
    });

    it("sign should return 503", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        User.destroy.mockResolvedValue(rejected);
        await userController.deleteUser(req, res);
        expect(res.statusCode).toBe(503);
    });
});