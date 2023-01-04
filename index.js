const express = require("express");
const app = express();
const port = 3000;

const fs = require("fs");
const fsProm = require("fs/promises");

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
            res.json(thePlayer);
        } catch (err) {
            next(err);
        }
    });
});

/**
 * Route delete one player. 
 */

app.delete("/players/:id", async (req, res, next) => {
    try {
        const data = await fsProm.readFile("data/players.json");
        const players = JSON.parse(data);
        const index = players.findIndex(player => player.id === req.params.id);
        
        if (index === -1) {
            const error = new Error("No such player to delete");
            error.httpcode = 404;
            throw error;
        }

        players.splice(index, 1);

        await fsProm.writeFile("data/players.json", JSON.stringify(players, null, 2));
        console.log('The file has been rewritten without deleted object!');
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

/**
 *  Route to delete all players
 */

app.delete("/players", (req, res, next) => {
    fs.writeFile("data/players.json", "", (err) => {
        try {
            if (err) throw err;
            console.log('All items deleted');
            res.sendStatus(204);
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