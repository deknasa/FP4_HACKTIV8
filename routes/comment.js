const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comment.controllers");
const authentication = require("../middleware/authentication").verify;
const authorization = require("../middleware/authorization").commentAuthorization;

router.use(authentication);

router.post("/", commentController.postComment);
router.get("/", commentController.getAllComment);
router.use(authorization);
router.put("/:id", commentController.updateComments);
router.delete("/:id", commentController.deleteComments);

module.exports = router;