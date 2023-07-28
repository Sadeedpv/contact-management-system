const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHead = req.headers.Authorization || req.headers.authorization;
  if (authHead && authHead.startsWith("Bearer")) {
    token = authHead.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Invalid token");
      }
      req.user = decoded.user;
      next();
    });

    if (!token) {
      res.status(401);
      throw new Error("Invalid token");
    }
  }
});

module.exports = validateToken;
