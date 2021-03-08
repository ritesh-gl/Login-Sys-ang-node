const db = require("../util/database");

module.exports = class User {
  constuctor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static find(email) {
    return db.execute("SELECT * FROM USERS WHERE email=?", [email]);
  }

  static findAll() {
    return db.execute("SELECT name,email FROM USERS");
  }

  static save(user) {
    return db.execute("INSERT INTO USERS (name,email,password) VALUES(?,?,?)", [
      user.name,
      user.email,
      user.password,
    ]);
  }
};

// let UserSchema = new mongoose.Schema(
//   {
//     Name: {
//       type: String,
//     },
//     Email: {
//       type: String,
//     },
//     Password: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("Signup", UserSchema);
// User.find = (Email) => {
//   User.findOne({ Email });
// };

// User.findAll = () => {
//   User.find({});
// };

// User.save = (Name, Email, Password) => ({});

// module.exports = User;
