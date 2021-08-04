const express = require('express')
const config = require('./config')
const init = require('./loaders/settings')
async function startServer(){
    const app = express();

    await init(app,config)
    app.listen(3000,() =>{
        console.log(`
################################################
🛡️  Server listening on port: 3000 🛡️
################################################
        `
        )
    }).on('error', err => {
        console.error(err);
        process.exit(1)
    })
}

startServer();