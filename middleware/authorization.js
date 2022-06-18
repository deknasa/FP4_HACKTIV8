const User = require("../models/index").user;
const Photo = require("../models/index").photo;
const Comment = require("../models/index").comment;
const SocialMedia = require("../models/index").socialmedia;

const userAuthorization = async(req, res, next) => {
    const userId = req.params.userId;
    const user_id = req.id;

    await User.findOne({ where: { id: userId } })
        .then((user) => {
            if (!user) {
                res.status(401).json({
                    message: "id not found",
                });
            } else if (user.id === user_id) {
                next();
            } else {
                res.status(402).json({
                    name: "authorization error",
                    devMessage: `User with  id ${user_id} does not have permission to acces User with id ${id}`,
                });
            }
        })
        .catch((e) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
            });
        });
};

const photoAuthorization = async(req, res, next) => {
    const photoId = req.params.photoId;
    const user_id = req.id;
    await Photo.findOne({ where: { id: photoId } })
        .then((photos) => {
            if (!photos) {
                res.status(401).json({
                    message: "id not found",
                });
            } else if (user_id === photos.user_id) {
                next();
            } else {
                res.status(402).json({
                    name: "authorization error",
                    devMessage: `User with  id ${user_id} does not have permission to acces Photos with id ${photoId}`,
                });
            }
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
            });
        });
};

const commentAuthorization = async(req, res, next) => {
    const commentId = req.params.commentId;
    const user_id = req.id;
    console.log(commentId);
    await Comment.findOne({ where: { id: commentId } })
        .then((comment) => {
            if (!comment) {
                res.status(401).json({
                    message: "id not found",
                });
            } else if (user_id === comment.user_id) {
                next();
            } else {
                res.status(402).json({
                    name: "authorization error",
                    devMessage: `User with  id ${user_id} does not have permission to acces comment with id ${commentId}`,
                });
            }
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
            });
        });
};

const socialMediaAuthorization = async(req, res, next) => {
    const socialMediaId = req.params.socialMediaId;
    const user_id = req.id;
    await SocialMedia.findOne({ where: { id: socialMediaId } })
        .then((socialmedia) => {
            if (!socialmedia) {
                res.status(401).json({
                    message: "id not found",
                });
            } else if (user_id === socialmedia.user_id) {
                next();
            } else {
                res.status(402).json({
                    name: "authorization error",
                    devMessage: `User with  id ${user_id} does not have permission to acces socialmedia with id ${socialMediaId}`,
                });
            }
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
            });
        });
};

module.exports = {
    userAuthorization,
    photoAuthorization,
    commentAuthorization,
    socialMediaAuthorization,
};