const db= require('../util/database');

module.exports=class User{
    constuctor(name,email,password){

    this.name=name;
    this.email=email;
    this.password=password;
}

static find(email){
    return db.execute(
        'SELECT * FROM USERS WHERE email=?',[email]
    );
}
static save(user){
    return db.execute(
       'INSERT INTO USERS (name,email,password) VALUES(?,?,?)',[user.name,user.email,user.password]
    )
}
};
