const dotenv = require('dotenv');

const envFound = dotenv.config();
if (envFound.error) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env.old file  ⚠️");
}

let env = process.env;
console.log("Logging env:", env.PGUSER)


module.exports = Config = {
    pgUser: process.env.PGUSER,
    pgHost: process.env.PGHOST,
    pgDb: process.env.PGDB,
    pgPass: process.env.PGPASS,
    pgPort: process.env.PGPORT,
    api_port:process.env.API_PORT
}