const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.body.token;
  if (!token) {
    return res.status(401).send("Access Denied");
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN);
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
}
