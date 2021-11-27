const router = require("express").Router();
const User = require("../models/User.model")
const bcryptjs = require("bcryptjs")

router.get("/login", (req, res, next) => {
    res.render("login");
  });
  router.get("/signup", (req, res, next) => {
    res.render("signup");
  });
  router.get("/private", (req, res, next) => {
    res.render("private");
  });
  
  
  router.post("/signup", async (req, res, next) => {
    const {username, password} = req.body
    
    // hashing password
    const saltRounds = 10
    try {
      const salt = await bcryptjs.genSalt(saltRounds)
      hashedPasswort = await bcryptjs.hash(password, salt)    
    } catch (error) {
      console.log(error);
    }
  
    //create user with hashed password
    try {
      await User.create({"username": username, "password": hashedPasswort})
      res.render("login");
    } catch (error) {
      console.log(error);
      res.redirect("/signup");
    }
  });
  
  router.post("/login", async (req, res, next) => {
    const {username, password} = req.body
  
    // verify password
    try {
      const foundUser = await User.findOne({"username": username})
      const verified = await bcryptjs.compare(password, foundUser.password)
      
      if (verified){
        res.redirect("/private");
      }
      else {
        res.render("login");
      }
    } catch (error) {
      console.log(error);
      res.redirect("/login");
    }
  });

  module.exports = router;