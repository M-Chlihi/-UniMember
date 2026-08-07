const jwt = require("jsonwebtoken");
require("dotenv").config();

const verfiyjwt = (req, res, next) => {
  const headerauth = req.headers["authorization"];
  console.log(headerauth);
  const token = headerauth.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);

    req.user = decoded;
    next();
  });
};

module.exports = verfiyjwt;
