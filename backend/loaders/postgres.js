const { Pool } = require('pg');
const getConnection = require('./connection');

function createDatabase(app) {

    const pool = getConnection();

    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS links(
            linkId int PRIMARY KEY NOT NULL,
            link varchar NOT NULL,
            code varchar NOT NULL,
        )
    `
    // const createDBQuery = `
    //     CREATE USER lithial with password 'halo1234';
    //     GRANT ALL PRIVILEGES ON DATABASE atlas TO lithial;
    //     \\c atlas;
    //     CREATE TABLE IF NOT EXISTS links(
    //     linkId int PRIMARY KEY NOT NULL,
    //     link varchar NOT NULL,
    //     code varchar NOT NULL,
    //     )
    //
    // `
    pool.connect((err,client,done) => {
        if (err) throw err;
        client.query(createDBQuery, (err, res) => {
            if (err) {
                console.log(err.stack);
            } else {
                console.log("User table created successfully");
            }
        });
        done();
    })

}
module.exports = {
    createDatabase:createDatabase
};