const userController = require("../../controllers/user.controllers");
const httpMocks = require("node-mocks-http");
const bcrypt = require("bcrypt");
const User = require("../../models/index").user;
const generate = require("../../middleware/authentication").generateToken;
const request = require('supertest')

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    bcrypt.compareSync = jest.fn().mockImplementation(() => true);
});

describe("User Controller Register", () => {
    beforeAll(() => {
        bcrypt.hashSync = jest.fn();
        generate.mockReturnValue("get Token");
    });

    it("register should return 400 ", async() => {
        const email = "email@gmail.com";
        User.findOne.mockResolvedValue({ rows: [email] });
        await userController.register(req, res);
        expect(res.statusCode).toBe(400);
    });
    it("register should return 201", async() => {
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue({ name: "user" });
        await userController.register(req, res);
        expect(res.statusCode).toBe(201);
    });
    it("register should return 403", async() => {
        const rejected = Promise.reject({ message: "can't sign up" });
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(rejected);
        await userController.register(req, res);
        expect(res.statusCode).toBe(403);
    });
    it("register should return 503", async() => {
        const rejected = Promise.reject({ message: "can't sign up" });
        User.findOne.mockResolvedValue(rejected);
        await userController.register(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("User Controller Login", () => {
    beforeAll(() => {
        bcrypt.hashSync = jest.fn();
        generate.mockReturnValue("get Token");
    });

    it("should return 401 if email not found", async() => {
        User.findOne.mockResolvedValue(null);
        await userController.login(req, res);
        expect(res.statusCode).toBe(401);
    });
    it("should return 403 if password not match", async() => {
        const data = {
            email: "email",
            password: "wrongpassword",
        };
        User.findOne.mockResolvedValue(data);
        bcrypt.compareSync = jest.fn().mockImplementation(() => false);
        await userController.login(req, res);
        expect(res.statusCode).toBe(403);
    });
    it("should return 200", async() => {
        User.findOne.mockResolvedValue({ user: "login" });
        userController.login(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "can't sign in" });
        User.findOne.mockResolvedValue(rejected);
        await userController.login(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("User Controller Update User", () => {
    it("should return 200", async() => {
        User.update.mockResolvedValue({ user: "user" });
        await userController.updateUser(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        User.update.mockResolvedValue(rejected);
        await userController.updateUser(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("User Controller Delete User", () => {
    it("should return 200", async() => {
        User.destroy.mockResolvedValue({ user: "user" });
        await userController.deleteUser(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "internal server error" });
        User.destroy.mockResolvedValue(rejected);
        await userController.deleteUser(req, res);
        expect(res.statusCode).toBe(503);
    });
});