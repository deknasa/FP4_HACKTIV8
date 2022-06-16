const express = require("express");
const router = express.Router();
const socialMediaController = require("../controllers/socialMedia.controllers");
const authentication = require("../middleware/authentication").verify;
const {authorization, socialMediaAuthorization} = require("../middleware/authorization");

router.use(authentication);
router.post("/", socialMediaController.postSocialMedia);
router.get("/", socialMediaController.getAllSocialMedias);
router.put("/:socialMediaId", socialMediaAuthorization, socialMediaController.updateSocialMedias);
router.delete("/:socialMediaId", socialMediaAuthorization, socialMediaController.deleteSocialMedia);

module.exports = router;