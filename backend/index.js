const express = require("express");
const Mongoose = require("mongoose");
const { dbURL } = require(`./config/config`);

const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const errorController = require("./controllers/error");

const authRoutes = require("./routes/auth");
const app = express();

const ports = process.env.PORT || 3000;
app.use(express.json());
Mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
Mongoose.connection;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
  next();
});

app.use("/auth", authRoutes);

// app.use("/verify", (req, res) => {
//   let token = req.headers["x-access-token"];

//   if (!token) {
//     return res.status(403).send({ message: "No Token Provided!" });
//   }
//   jwt.verify(token, "secretfortoken", (err, decoded) => {
//     if (err) {
//       return res.status(401).send({ message: "Unauthorised!" });
//     }
//     console.log(decoded);
//     res.status(200).send({ message: decoded });
//   });
// });

app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, () => console.log("listen on port " + ports));
