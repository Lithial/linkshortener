const express = require('express')
const config = require('./config')
const init = require('./loaders/settings')
async function startServer(){
    const app = express();

    await init(app,config)
    app.listen(config.api_port,() =>{
        console.log(`
################################################
🛡️  Server listening on port: ${config.api_port} 🛡️
################################################
        `
        )
    }).on('error', err => {
        console.error(err);
        process.exit(1)
    })
}

startServer();