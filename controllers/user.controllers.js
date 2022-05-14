const User = require("../models/index").user
const bcrypt = require("bcrypt")
const generateToken = require("../middleware/authentication").generateToken

// user register function
exports.register = async (req, res) => {
    const full_name = req.body.full_name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const profile_image_url = req.body.profile_image_url;
    const age = req.body.age;
    const phone_number = req.body.phone_number

    await User.findOne({
        where: {
            email: email,
            username: username,
        },
    })
    .then(user => {
        if(user) {
            return res.status(400).send({
                message: "Email or Username Already Exist"
            })
        }
        const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        return User.create({
            full_name: full_name,
            email: email,
            username: username,
            password: hash,
            profile_image_url: profile_image_url,
            age: age,
            phone_number: phone_number
        })
        .then(user => {
            const data = {
                id: user.id,
                email: email,
                full_name: full_name,
                username: username,
                profile_image_url: profile_image_url,
                age: age,
                phone_number: phone_number

            }
            const token = generateToken(data)
            res.status(201).send({
                status: "SUCCESS",
                message: "Successfully Registered",
                token: token,
                data: user
            })
        })
        .catch(e => {
            console.log(e);
            res.status(503).send({
                status: "FAILED",
                message: "Failed to Register"
            })
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({
            status: "FAILED",
            message: "INTERNAL SERVER ERROR"
        })
    })
}

exports.login = async (req, res) => {
    const body = req.body;
    const email = body.email
    const password = body.password

    return User.findOne({
        where: {
            email: email
        }
    })
    .then(user => {
        if (!user) {
            return res.status(401).send({
                message: "email not found"
            })
        }
        const passwordValid = bcrypt.compareSync(password, user.password)
        if (!passwordValid) {
            return res.status(403).send({
                message: "password and email not match"
            })
        }
        const data = {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            username: user.username,
            profile_image_url: user.profile_image_url,
            age: user.age,
            phone_number: user.phone_number
        }
        const token = generateToken(data)
        res.status(200).send({
            token: token
        })
    })
    .catch(e => {
        console.log(e);
        res.status(503).send({
            message: "INTERNAL SERVER ERROR",
            error: e
        })
    })
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const full_name = req.body.full_name;
    const email = req.body.email;
    const username = req.body.username;
    const profile_image_url = req.body.profile_image_url;
    const age = req.body.age;
    const phone_number = req.body.phone_number;
    const dataUser = {
        full_name: full_name,
        email: email,
        username: username,
        profile_image_url: profile_image_url,
        age: age,
        phone_number: phone_number,
    };

    await User.update(dataUser, {
        where: { id },
        returning: true,
    })
    .then(() => {
        res.status(200).json({
            user: dataUser,
        });
    })
    .catch((error) => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error,
        });
    });
};

exports.deleteUser = async(req, res) => {
    const id = req.params.id;
    await User.destroy({ where: { id } })
    .then(() => {
        res.status(200).json({
            message: "Your account has been succesfully deleted",
        });
    })
    .catch((error) => {
        res.status(503).json({
            message: "INTERNAL SERVER ERROR",
            error: error,
        });
    });
};

