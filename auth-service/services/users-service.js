const User = require("../models/index")["User"];
const jwt = require("jsonwebtoken");
const PasswordHasher = require("./password-hasher");

module.exports = class UsersService {
  constructor(){
    this.passwordHassher = new PasswordHasher();
  }

  async create(user) {
    user.password = await this.passwordHassher.hash(user.password);
    user = await User.create(user);
    return this.generateAccessToken(user);
  }

  async findByEmail(email) {
    return await User.findOne({ where: {email}});
  }

  async signIn(email, password) {
    let user = await this.findByEmail(email);
    if (!user) {
      return null;
    }
    if(await this.passwordHassher.check(password, user.password)) {
      return this.generateAccessToken(user);
    }else {
      return null;
    }
  }


  generateAccessToken(user) {
    if(!user) {
      throw new Error("Invalid User");
    }

    let userInfo = user.toJSON();
    delete userInfo.password;
    let payload = {
      user: userInfo
    };

    const token = jwt.sign(payload, process.env.AUTH_SECRET, {
      algorithm: "HS256",
      issuer: process.env.TOKEN_ISSUER,
      subject: `${user.id}`
    });

    return token;
   }
}