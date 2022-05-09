const Joi = require("joi");

class userValidation {
    static async userSignUp(req, res, next) {
        const schema = Joi.object().keys({
            full_name: Joi.string().required(),
            email: Joi.string().email().required(),
            username: Joi.string().required(),
            password: Joi.string()
                .regex(/^[a-zA-Z0-9]{3,30}$/)
                .required(),
            profile_image_url: Joi.string().uri().required(),
            age: Joi.number().required(),
            phone_number: Joi.number().required(),
        });

        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            res.status(401).json({
                message: "invalid user input",
                error: err.message,
            });
        }
    }

    static async userSignIn(req, res, next) {
        const schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string()
                .regex(/^[a-zA-Z0-9]{3,30}$/)
                .required(),
        });
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            res.status(401).json({
                message: "invalid user input",
                error: err.message,
            });
        }
    }

    static async userUpdate(req, res, next) {
        const schema = Joi.object().keys({
            full_name: Joi.string().required(),
            email: Joi.string().email().required(),
            username: Joi.string().required(),
            profile_image_url: Joi.string().uri().required(),
            age: Joi.number().required(),
            phone_number: Joi.number().required(),
        });

        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            res.status(401).json({
                message: "invalid user input",
                error: err.message,
            });
        }
    }
}

class photoValidation {
    static async postAndUpdatePhoto(req, res, next) {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            caption: Joi.string().required(),
            poster_image_url: Joi.string().uri().required(),
        });
        try {
            await schema.validateAsync(req.body);
            next();
        } catch (err) {
            res.status(401).json({
                message: "invalid user input",
                error: err.message,
            });
        }
    }
}

module.exports = {
    userValidation,
    photoValidation,
};