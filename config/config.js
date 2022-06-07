require("dotenv").config();

module.exports = {
    development: {
        // user: "ajbgokqjttgehv",
        // password: "e9cc3881da171960b9de6284d3e7bdb85a14fe66180d159706fd9c624ad2bfb4",
        // database: "dafb0nqt2g2tng",
        // port: 5432,
        // host: "ec2-52-200-215-149.compute-1.amazonaws.com",
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
        // username: "ajbgokqjttgehv",
        // password: "e9cc3881da171960b9de6284d3e7bdb85a14fe66180d159706fd9c624ad2bfb4",
        // database: "dafb0nqt2g2tng",
        // port: 5432,
        // host: "ec2-52-200-215-149.compute-1.amazonaws.com",
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

        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres",
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            }
        }
    },
};