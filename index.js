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

            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        } catch (err) {
            next(err);
        }
    });    
});

/**
 * Route to return one player.
 */

app.get("/players/:id", (req, res, next) => {
    fs.readFile("data/players.json", "utf-8", function(err, data) {
        try {
            if (err) throw err;
            const players = JSON.parse(data);
            const thePlayer = players.find(player => player.id === req.params.id);

            if (!thePlayer) {
                const error = new Error("No such player");
                error.httpcode = 404;
                throw error;
            }
            //res.writeHead(200, {"Content-Type": "application/json"});
            res.json(thePlayer);
        } catch (err) {
            next(err);
        }
    });
});

/**
 * Middleware to catch errors and send response.
 */

app.use((error, req, res, next) => {
    res.sendStatus(error.httpcode || 500);
    console.log(error); 
})

/**
 * Setup server to listen to specified port.
 */

app.listen(port, () => console.log("Server started at http://localhost port: " + port));