require("dotenv").config();

module.exports = {
    development: {
        // username: "euixlpygycmjol",
        // password: "bee04866d5a7b7119bad04db366cc5a49117472804fb719c0a85b66ceb2a5e6d",
        // database: "d7l0uknvvcvo6m",
        // port: 5432,
        // host: "ec2-3-226-163-72.compute-1.amazonaws.com",
        // dialect: "postgres",
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
    production: {
        // username: "euixlpygycmjol",
        // password: "bee04866d5a7b7119bad04db366cc5a49117472804fb719c0a85b66ceb2a5e6d",
        // database: "d7l0uknvvcvo6m",
        // port: 5432,
        // host: "ec2-3-226-163-72.compute-1.amazonaws.com",
        // dialect: "postgres",
        // dialectOptions: {
        //     ssl: {
        //         require: true,
        //         rejectUnauthorized: false,
        //     }
        // }


        // dialect: "postgres",
        // ssl: {
        //     require: true,
        //     rejectUnauthorized: false,
        // },
        // use_env_variable: "DATABASE_URL",

        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres",
        ssl: {
            require: true,
            rejectUnauthorized: false,
        }
    },
};