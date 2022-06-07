const socialMediaController = require("../../controllers/socialMedia.controllers");
const httpMocks = require("node-mocks-http");
const SocialMedia = require("../../models/index").socialmedia;

jest.mock("../../models");
jest.mock("../../middleware/authentication");

let req, res;

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe("Social Media Controller Get All Social Medias", () => {
    it("should return 200", async() => {
        SocialMedia.findAll.mockResolvedValue({ socialmedia: "instagram" });
        await socialMediaController.getAllSocialMedias(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        SocialMedia.findAll.mockResolvedValue(rejected);
        await socialMediaController.getAllSocialMedias(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Social Media Controller Post Social Media", () => {
    it("should return 201", async() => {
        SocialMedia.create.mockResolvedValue({ socialmedia: "intagram" });
        await socialMediaController.postSocialMedia(req, res);
        expect(res.statusCode).toBe(201);
    });
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        SocialMedia.create.mockResolvedValue(rejected);
        await socialMediaController.postSocialMedia(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Social Media Controller Update Social Media", () => {
    it("should return 200", async() => {
        SocialMedia.update.mockResolvedValue({ socialmedia: "intagram" });
        await socialMediaController.updateSocialMedias(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        SocialMedia.update.mockResolvedValue(rejected);
        await socialMediaController.updateSocialMedias(req, res);
        expect(res.statusCode).toBe(503);
    });
});

describe("Social Media Controller Delete Social Media", () => {
    it("should return 200", async() => {
        SocialMedia.destroy.mockResolvedValue({ socialmedia: "intagram" });
        await socialMediaController.deleteSocialMedia(req, res);
        expect(res.statusCode).toBe(200);
    });
    it("should return 503", async() => {
        const rejected = Promise.reject({ message: "error" });
        SocialMedia.destroy.mockResolvedValue(rejected);
        await socialMediaController.deleteSocialMedia(req, res);
        expect(res.statusCode).toBe(503);
    });
});