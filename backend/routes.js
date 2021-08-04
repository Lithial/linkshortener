const getConnection = require('./loaders/connection')

module.exports = (app) => {

    const getLinkFromDB = (pool, getQuery, res) =>{
        pool.connect((err,client, done) => {
            if(err) throw err;
            client.query(getQuery)
                .then(response => {
                    if(response.rowCount === 0){
                        return res.send({
                            msg: "Code not found",
                            status: "404"
                        })
                    }
                    else{
                        //decode response
                        let row = response.rows[0]
                        //redirect to link
                        console.log("link: " +row.link)
                        res.redirect(`${row.link}`);
                        res.end();
                    }
                })
                .catch(e => console.log(e.stack));
            done();
        })
    }

    app.get('/:id', (req,res) => {
        console.log("get request working")
        //decypher params.
        const params = req.params;
        console.log("params:" + params.toString())
        //make get request to server
        // get pool
        const pool = getConnection();
        let code = params.id;
        console.log(`CODE | ${code}`)
        if(code !== null){
            console.log(`GET | ${code}`)

            const getQuery = (code) => { return `SELECT * FROM links WHERE code = '${code}';` }
            getLinkFromDB(pool, getQuery(code), res)
        }

        //do analytics?


    })

    app.post('/createlink', (req,res) => {
        console.log("post request working");

        //decode input
        const link = req.body.link;

        const code = Math.random().toString(36).substr(2, 8);
        //post to database

        const  createLink = (code, link) => {
            return `
        INSERT INTO links (code, link, datecreated)
        VALUES ('${code}','https://${link}', current_date)
        ON CONFLICT DO NOTHING;`
        }
        const pool = getConnection();
        pool.connect((err,client, done) => {
            if (err) throw err;
            client.query(createLink(code.toString(), link.toString()))
                .then(response => {
                    if(response.rowCount === 0){
                        return res.send({
                            msg: "Link not created. Database error",
                            status: "400"
                        })
                    }
                    return res.send({
                        msg: "seems to have worked",
                        "code": code,
                        status: "200"
                    })
                })
            done();
        })
    })
}