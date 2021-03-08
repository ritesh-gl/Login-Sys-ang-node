const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No Token Provided!" });
  }
  jwt.verify(token, "secretfortoken", (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorised!" });
    }
    req.userId = decoded.userId;
    req.email = decoded.email;
    next();
    //   console.log(decoded);
    //   res.status(200).send({ message: decoded });
  });
};

module.exports = verifyToken;
