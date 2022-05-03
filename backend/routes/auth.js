const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const { findOne } = require('../models/User');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRETE = "this is very secrete code save in invi.. variable"


//Route:1
//creat a user using: POST "/api/auth/createUser" Doesn't require auth no login required

router.post('/createUser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 6 characters').isLength({ min: 6 }),
], async (req, res) => {
  let success = false;
  // if there are errors,return Bad requist and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    success = false;
    return res.status(400).json({ errors: errors.array() });
  }
  //check whether the user email already exist
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      success = false;
      return res.status(400).json({ errors: " sorry email is already exist" })
    }
    //incripting password
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt)
    //data storeing
    user = await User.create({
      name: req.body.name,
      password: secPass,
      email: req.body.email,
    });
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRETE);
    success = true;
    res.json({ success, authtoken })
  } catch (error) {
    console.error(error.message);
    success = false;
    res.status(500).send("internal servaer error")
  }
})

//Route:2
//login a user using: POST "/api/auth/login" Doesn't require auth no login required

router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'password can not be blank').exists(),
], async (req, res) => {
  let success = false;
  // if there are errors,return Bad requist and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email })
    if (!user) {
      success = false;
      return res.status(400).json({ errors: "please try to login with correct credentials" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ errors: "please try to login with correct credentials" });
    }
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRETE);
    success = true;
    res.json({ success, authtoken })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal servaer error")
  }
})

//Route:3
//get loggedin user details using: POST "/api/auth/getuser"  login required
router.post('/getuser', fetchuser, async (req, res) => {

  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal servaer error")
  }
})
router.post('/getusers', fetchuser, async (req, res) => {

  try {
    const user = await User.find({}).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal servaer error")
  }
})
router.put('/updateuser/:_id',  [
  body('name', 'Enter a valid title(min length:3)').isLength({ min: 3 }),
  body('email', 'Description must be atleast 5 character').isEmail()
], async (req, res) => {
  try {
      const { name, email } = req.body;
      // if there are errors,return Bad requist and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const newUser = {};
      if (name) { newUser.name = name }
      if (email) { newUser.email = email }
     
      // find the note to be updated and update it
      let user = await User.findById(req.params._id);
      console.log(user);
      if (!user) {
          return res.status(404).send("Not Found")
      }
      
     
      user = await User.findByIdAndUpdate(req.params._id, { $set: newUser }, { new: true });
      res.json({ user })


  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})



module.exports = router