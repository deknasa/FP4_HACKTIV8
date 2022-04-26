const Pool = require('pg').Pool

const pool = new Pool({
    user : 'postgres',
    host : 'localhost',
    database : 'MyGram',
    password : 'bolaliloq'
})

module.exports = pool