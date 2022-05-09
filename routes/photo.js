const express = require("express");
const router = express.Router();
const photoController = require("../controllers/photo.controllers");
const authentication = require("../middleware/authentication").verify;
const authorization = require("../middleware/authorization").photoAuthorization;
const { photoValidation } = require("../middleware/validation");

router.use(authentication);

router.post("/", photoValidation.postAndUpdatePhoto, photoController.postPhoto);
router.get("/", photoController.getAllPhotos);
router.put("/:photoId", authorization, photoController.updatePhoto);
router.delete("/:photoId", authorization, photoController.deletePhoto);

module.exports = router;