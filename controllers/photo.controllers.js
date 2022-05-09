const Photo = require("../models/index").photo;
const Comment = require("../models/index").comment;
const User = require("../models/index").user;

exports.getAllPhotos = async(req, res) => {
    const user_id = req.id;
    await Photo.findAll({
            where: {
                user_id: user_id,
            },
            include: [{
                    model: Comment,
                    as: "comments",
                    attributes: ["comment"],
                    include: [{
                        model: User,
                        as: "user",
                        attributes: ["username"],
                    }, ],
                },
                {
                    model: User,
                    as: "user",
                    attributes: ["id", "username", "profile_image_url"],
                },
            ],
        })
        .then((photos) => {
            return res.status(200).json({
                photo: photos,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(503).json({
                msg: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};

exports.postPhoto = async(req, res) => {
    const title = req.body.title;
    const caption = req.body.caption;
    const poster_image_url = req.body.poster_image_url;
    const user_id = req.id;

    await Photo.create({
            title: title,
            caption: caption,
            poster_image_url: poster_image_url,
            user_id: user_id,
        })
        .then((photo) => {
            res.status(201).send({
                id: photo.id,
                title: photo.title,
                poster_image_url: photo.poster_image_url,
                caption: photo.caption,
                user_id: photo.user_id,
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: e,
            });
        });
};

exports.updatePhoto = async(req, res) => {
    const photoId = req.params.photoId;
    const title = req.body.title;
    const caption = req.body.caption;
    const poster_image_url = req.body.poster_image_url;
    const dataPhoto = {
        title,
        caption,
        poster_image_url,
    };
    await Photo.update(dataPhoto, {
            where: { id: photoId },
            returning: true,
        })
        .then((photos) => {
            res.status(200).json({
                photos: photos[1],
            });
        })
        .catch((e) => {
            console.log(e);
            res.status(503).json({
                msg: "INTERNAL SERVER ERROR",
            });
        });
};

exports.deletePhoto = async(req, res) => {
    const photoId = req.params.photoId;
    await Photo.destroy({ where: { id: photoId } })
        .then(() => {
            res.status(200).json({
                message: "Your Photo has been succesfully deleted",
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(503).json({
                message: "INTERNAL SERVER ERROR",
                error: error,
            });
        });
};