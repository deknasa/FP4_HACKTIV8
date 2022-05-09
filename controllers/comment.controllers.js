const Comment = require("../models/index").comment;
const Photo = require("../models/index").photo;
const User = require("../models/index").user;

exports.getAllComment = async(req, res) => {
    const user_id = req.id;

    await Comment.findAll({
            where: { user_id },
            include: [{
                    model: Photo,
                    as: "photos",
                    attributes: ["id", "title", "caption", "poster_image_url"],
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "username", "profile_image_url", "phone_number"],
                },
            ],
        })
        .then((comments) => {
            res.status(200).json({
                comments: comments,
            });
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.postComment = async(req, res) => {
    const user_id = req.id;
    const comment = req.body.comment;
    const photo_id = req.body.photo_id;

    await Photo.findOne({ where: { id: photo_id } }).then((photos) => {
        if (!photos) {
            return res.status(401).json({
                message: `photo with id ${photo_id} not found`,
            });
        }
        return Comment.create({
                comment: comment,
                user_id: user_id,
                photo_id: photo_id,
            })
            .then((result) => {
                res.status(200).json({
                    comment: result,
                });
            })
            .catch((err) => {
                res.status(503).json({
                    message: "internal server error",
                    result: err,
                });
            });
    });
};

exports.updateComments = async(req, res) => {
    const commentId = req.params.commentId;
    const comment = req.body.comment;
    const dataComment = {
        comment: comment,
    };
    await Comment.update(dataComment, {
            where: { id: commentId },
            returning: true,
        })
        .then((comments) => {
            res.status(200).json({
                comments: comments[1],
            });
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.deleteComments = async(req, res) => {
    const commentId = req.params.commentId;
    await Comment.destroy({ where: { id: commentId } })
        .then(() => {
            res.status(200).json({
                message: "Your comments has been succesfully deleted",
            });
        })
        .catch((error) => {
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};