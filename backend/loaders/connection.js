const { Pool } = require('pg');
const config = require('../config');

module.exports = () =>{
    const pool = new Pool({
        user: config.pgUser,
        host: config.pgHost,
        database: config.pgDb,
        password: config.pgPass,
        port: config.pgPort
    });

    pool.on('error', (err,client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
    });

    return pool;
}