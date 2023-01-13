const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
const playersRouter = require("./routes/players.route");
const {
  errorHandler,
  invalidPathHandler,
} = require("./errorhandlers/errorhandlers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

app.use("/players", playersRouter);

app.use(invalidPathHandler);
app.use(errorHandler);

/* app.use((error, req, res, next) => {
  res.sendStatus(error.httpcode || 500);
  console.log(error);
}); */

app.listen(port, () => console.log("Server started at port: " + port));
