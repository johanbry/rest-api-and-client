const express = require("express");
const app = express();
const port = 3000;
const dataFilePath = "data/players.json";

const fs = require("fs");
const fsProm = require("fs/promises");

const cors = require("cors") 
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) 
  }
});

const upload = multer({ storage: storage });

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"))

/**
 * Route to return all players.
 */

app.get("/players", (req, res, next) => {
    fs.readFile(dataFilePath, "utf-8", function(err, data) {
        try {
            if (err) throw err;
            if (data.length < 1) {
                const error = new Error("Empty file");
                error.httpcode = 404;
                throw error;
            }

            res.setHeader("Content-Type", "application/json");
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
    fs.readFile(dataFilePath, "utf-8", function(err, data) {
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
 * Route to delete one player. 
 */

app.delete("/players/:id", async (req, res, next) => {
    try {
        const data = await fsProm.readFile(dataFilePath);
        const players = JSON.parse(data);
        const index = players.findIndex(player => player.id === req.params.id);
        
        if (index === -1) {
            const error = new Error("No such player to delete");
            error.httpcode = 404;
            throw error;
        }

        players.splice(index, 1);

        await fsProm.writeFile(dataFilePath, JSON.stringify(players, null, 2));
        console.log("The file has been rewritten without deleted object!");
        res.sendStatus(204);
    } catch (err) {
        next(err);
    }
});

/**
 *  Route to delete all players
 */

app.delete("/players", (req, res, next) => {
    fs.writeFile(dataFilePath, "", (err) => {
        try {
            if (err) throw err;
            console.log("All items deleted");
            res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    });
});

/**
 * Route to create (POST) a player
 */

app.post("/players", upload.single('image'), async (req, res, next) => {
    try {
        const fileData = await fsProm.readFile(dataFilePath);
        const newId = uuidv4();
        const newData = JSON.parse(req.body.data);
        let players = [];

        const newPlayer =
        {
            id: newId,
            firstName: newData.firstName,
            lastName: newData.lastName,
            dateOfBirth: newData.dateOfBirth,
            nationality: newData.nationality,
            youthTeam: newData.youthTeam,
            shoots: newData.shoots,
            position: newData.position,
            height: newData.height,
            weight: newData.weight,
            team: newData.team,
            league: newData.league,
            number: newData.number,
        }

        if (req.file)
            newPlayer.image = req.file.filename;
        else   
            newPlayer.image = "";

        if (fileData.length > 1)
            players = JSON.parse(fileData);

        players.push(newPlayer);

        await fsProm.writeFile(dataFilePath, JSON.stringify(players, null, 2));
        console.log('The file has been updated with new player!');
        res.setHeader("Location", "/players/" + newId);
        res.json(newPlayer);
    } catch (err) {
        next(err);
    }
});

/**
 * Route to update (PUT) a player.
 */

app.put("/players/:id", upload.single('image'), async (req, res, next) => {
    try {
        const fileData = await fsProm.readFile(dataFilePath);
        const id = req.params.id;
        const newData = JSON.parse(req.body.data);
        let players = [];

        if (fileData.length > 1)
            players = JSON.parse(fileData);

        const index = players.findIndex(player => player.id === id);
    
        if (index === -1) {
            const error = new Error("No such player to update!");
            error.httpcode = 404;
            throw error;
        }

        const updatedPlayer =
        {
            id: id,
            firstName: newData.firstName,
            lastName: newData.lastName,
            dateOfBirth: newData.dateOfBirth,
            nationality: newData.nationality,
            youthTeam: newData.youthTeam,
            shoots: newData.shoots,
            position: newData.position,
            height: newData.height,
            weight: newData.weight,
            team: newData.team,
            league: newData.league,
            number: newData.number,
            image: newData.image
        }

        if (req.file)
            updatedPlayer.image = req.file.filename;

        players[index] = updatedPlayer;

        await fsProm.writeFile(dataFilePath, JSON.stringify(players, null, 2));
        console.log('The file has been rewritten with object updated!');
        res.setHeader("Location", "/players/" + id);
        res.json(updatedPlayer);
    } catch (err) {
        next(err);
    }
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