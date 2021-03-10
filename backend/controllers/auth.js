const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = async (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // try {
  //   console.log(name);
  //   const hashedPassword = await bcrypt.hash(password, 12);

  //   const userDetails = {
  //     name: name,
  //     email: email,
  //     password: hashedPassword,
  //   };

  //   const result = await User.save(userDetails);

  //   res.status(201).send({ message: "User registered!" });
  // } catch (err) {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // }
  const user = new User({
    Name: req.body.name,
    Password: await bcrypt.hashSync(req.body.password, 12),
    Email: req.body.email,
  });
  user
    .save()
    .then(() => {
      res.status(200).send({ message: "User registered!" });
    })
    .catch((err) => {
      res.status(500).send({ message: err });
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("Email: " + email, +" pass: " + password);
  // try {
  //   var user;
  //   User.findByEmail(email).then((data) => {
  //     user = data;

  //     console.log(user);
  //     if (user.length != 1) {
  //       const error = new Error("A user with this email could not be found.");
  //       error.statusCode = 401;
  //       throw error;
  //     }
  //     const storedUser = user[0];

  //     var isEqual = bcrypt.compare(password, storedUser.Password);
  //     console.log(isEqual);
  //     if (!isEqual) {
  //       console.log("token");

  //       res.status(400).json({ status: false, message: "wrong password" });
  //     }

  //     const token = jwt.sign(
  //       {
  //         email: storedUser.email,
  //         userId: storedUser.id,
  //       },
  //       "secretfortoken",
  //       { expiresIn: "1h" }
  //     );

  //     res.status(200).json({ token: token, userId: storedUser.id });
  //   });
  // } catch (err) {
  //   if (!err.statusCode) {
  //     err.statusCode = 500;
  //   }
  //   next(err);
  // }
  User.findOne({ Email: email }, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!user) {
      return res.status(404).send({ message: "user not registered!" });
    }
    if (user) {
      if (bcrypt.compareSync(password, user.Password)) {
        const token = jwt.sign(
          {
            email: user.Email,
            userId: user.id,
          },
          "secretfortoken",
          { expiresIn: "1h" }
        );

        return res.status(200).json({ token: token, userId: user.id });
        // return res.status(200).send({ message: "Logged in" });
      } else {
        return res.status(403).send({ message: "password doesn't match!" });
      }
    }
  });
};

exports.showData = (req, res, next) => {
  // var token =req.body.token;
  try {
    //mongoose projection to remove password from response document.
    User.findAll().then((data) => {
      var user = data;
      // console.log(data);
      if (user.length == 0) {
        const error = new Error("No user to show");
        error.statusCode = 401;
        throw error;
      }

      res.status(200).json({ user: user });
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    // next(err);
  }
};
