const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.body.authToken;
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    console.log("verified token", verified);
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;
