function errorHandler(error, req, res, next) {
  res.sendStatus(error.statusCode || 500);
  console.log(error);
  console.log("errorhandler");
}

function invalidPathHandler(req, res) {
  res.sendStatus(404);
  console.log("404");
}

module.exports = { errorHandler, invalidPathHandler };
