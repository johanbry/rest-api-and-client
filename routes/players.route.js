const express = require("express");
const router = express.Router();

const {
  getAllPlayers,
  getOnePlayer,
  deleteOnePlayer,
  deleteAllPlayers,
  createPlayer,
  updatePlayer,
} = require("../controllers/players.controller");

const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

/**
 * Route to return all players.
 */

router.get("/", getAllPlayers);

/**
 * Route to return one player.
 */

router.get("/:id", getOnePlayer);

/**
 * Route to delete one player.
 */

router.delete("/:id", deleteOnePlayer);

/**
 *  Route to delete all players
 */

router.delete("/", deleteAllPlayers);

/**
 * Route to create (POST) a player
 */

router.post("/", upload.single("image"), createPlayer);

/**
 * Route to update (PUT) a player.
 */

router.put("/:id", upload.single("image"), updatePlayer);

module.exports = router;
