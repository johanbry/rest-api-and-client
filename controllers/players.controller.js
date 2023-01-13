const dataFilePath = "data/players.json";

const fs = require("fs");
const fsProm = require("fs/promises");

const ServerError = require("../classes/ServerError");

const { v4: uuidv4 } = require("uuid");

function getAllPlayers(req, res, next) {
  fs.readFile(dataFilePath, "utf-8", function (err, data) {
    try {
      if (err) throw err;
      if (data.length < 1) {
        throw new ServerError(404, "Empty file");
      }

      res.setHeader("Content-Type", "application/json");
      res.send(data);
    } catch (err) {
      next(err);
    }
  });
}

function getOnePlayer(req, res, next) {
  fs.readFile(dataFilePath, "utf-8", function (err, data) {
    try {
      if (err) throw err;

      const players = JSON.parse(data);
      const thePlayer = players.find((player) => player.id === req.params.id);

      if (!thePlayer) {
        throw new ServerError(404, "No such player");
      }
      res.json(thePlayer);
    } catch (err) {
      next(err);
    }
  });
}

async function deleteOnePlayer(req, res, next) {
  try {
    const data = await fsProm.readFile(dataFilePath);
    const players = JSON.parse(data);
    const index = players.findIndex((player) => player.id === req.params.id);

    if (index === -1) {
      throw new ServerError(404, "No such player to delete");
    }

    players.splice(index, 1);

    await fsProm.writeFile(dataFilePath, JSON.stringify(players, null, 2));
    console.log("The file has been rewritten without deleted object!");
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
}

function deleteAllPlayers(req, res, next) {
  fs.writeFile(dataFilePath, "", (err) => {
    try {
      if (err) throw err;
      console.log("All items deleted");
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });
}

async function createPlayer(req, res, next) {
  try {
    const fileData = await fsProm.readFile(dataFilePath);
    const newId = uuidv4();
    const newData = JSON.parse(req.body.data);
    let players = [];

    const newPlayer = {
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
    };

    if (req.file) newPlayer.image = req.file.filename;
    else newPlayer.image = "";

    if (fileData.length > 1) players = JSON.parse(fileData);

    players.push(newPlayer);

    await fsProm.writeFile(dataFilePath, JSON.stringify(players, null, 2));
    console.log("The file has been updated with new player!");
    res.setHeader("Location", "/players/" + newId);
    res.json(newPlayer);
  } catch (err) {
    next(err);
  }
}

async function updatePlayer(req, res, next) {
  try {
    const fileData = await fsProm.readFile(dataFilePath);
    const id = req.params.id;
    const newData = JSON.parse(req.body.data);
    let players = [];

    if (fileData.length > 1) players = JSON.parse(fileData);

    const index = players.findIndex((player) => player.id === id);

    if (index === -1) {
      throw new ServerError(404, "No such player to update!");
    }

    const updatedPlayer = {
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
      image: newData.image,
    };

    if (req.file) updatedPlayer.image = req.file.filename;

    players[index] = updatedPlayer;

    await fsProm.writeFile(dataFilePath, JSON.stringify(players, null, 2));
    console.log("The file has been rewritten with object updated!");
    res.setHeader("Location", "/players/" + id);
    res.json(updatedPlayer);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllPlayers,
  getOnePlayer,
  deleteOnePlayer,
  deleteAllPlayers,
  createPlayer,
  updatePlayer,
};
