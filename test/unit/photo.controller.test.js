const photoController = require("../../controllers/photo.controllers");
const httpMocks = require("node-mocks-http");
const Photo = require("../../models/index").photo;

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("Photo Controller Get All Photos", () => {
    it("should return 200", async() => {
        Photo.findAll.mockResolvedValue({ photo: "photo" });
        await photoController.getAllPhotos(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        Photo.findAll.mockResolvedValue(rejected);
        await photoController.getAllPhotos(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Photo Controller Post Photo", () => {
    it("post Photos should return 201", async() => {
        Photo.create.mockResolvedValue({ Photos: "photo" });
        await photoController.postPhoto(req, res);
        expect(res.statusCode).toBe(201);
    });
    it("post Photos should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        Photo.create.mockResolvedValue(rejected);
        await photoController.postPhoto(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Photo Controller Update Photo", () => {
    it("Update Photo should return 200", async() => {
        Photo.update.mockResolvedValue({ photo: "photos" });
        await photoController.updatePhoto(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("Update Photo should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        Photo.update.mockResolvedValue(rejected);
        await photoController.updatePhoto(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Photo Controller Delete Photo", () => {
    it("delete photo should return 200", async() => {
        Photo.destroy.mockResolvedValue({ socialmedia: "intagram" });
        await photoController.deletePhoto(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("delete photo should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        Photo.destroy.mockResolvedValue(rejected);
        await photoController.deletePhoto(req, res);
        expect(res.statusCode).toBe(503);
    });
});