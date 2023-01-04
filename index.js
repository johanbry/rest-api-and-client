const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");


/**
 * Route to return all players.
 */

app.get("/players", (req, res, next) => {
    fs.readFile("data/players.json", "utf-8", function(err, data) {
        try {
            if (err) throw err;
            if (data.length < 1) {
                const error = new Error("Empty file");
                error.httpcode = 404;
                throw error;
            }
            console.log(data);
            //res.writeHead(200, {"Content-Type": "application/json"});
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (err) {
            next(err);
        }
    });    
});

app.listen(port, () => console.log("Server started at http://localhost port: " + port));