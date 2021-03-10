const db = require("../util/database");
const mongoose = require("mongoose");

// module.exports = class User {
//   constuctor(name, email, password) {
//     this.name = name;
//     this.email = email;
//     this.password = password;
//   }

//   static find(email) {
//     return db.execute("SELECT * FROM USERS WHERE email=?", [email]);
//   }

//   static findAll() {
//     return db.execute("SELECT name,email FROM USERS");
//   }

//   static save(user) {
//     return db.execute("INSERT INTO USERS (name,email,password) VALUES(?,?,?)", [
//       user.name,
//       user.email,
//       user.password,
//     ]);
//   }
// };

let UserSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
    },
    Email: {
      type: String,
    },
    Password: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Signup", UserSchema);
User.findByEmail = (Email) => {
  return User.find({ Email });
};

User.findAll = () => {
  return User.find({});
};

User.save = (user) => {
  User.create({ Name: user.name, Email: user.email, Password: user.password });
};

module.exports = User;
