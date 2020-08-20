const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const url = req.protocol + '://' + req.get('host');
    const user = new User({
      name: req.body.name,
      password: hash,
      title: req.body.title,
      imagePath: req.file && req.file.filename ? url + '/images/' + req.file.filename: '',
      content: req.body.content ? req.body.content:'',
      isAdmin: req.body.isAdmin
    })
    user.save()
    .then(result => {
      res.status(201).json({
        message: 'User has been successfully signed up',
        result: result
      })
    })
    .catch(error => {
      console.log(error);
      res.status(404).json({
        message: 'Invalid credentials !'
      })
    })
  })
  .catch(error => {
    console.log(error);
  })
}

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  User.findOne({name: req.body.username})
  .then(user => {
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: 'Invalid credentials... PLease enter valid credentials !'
      });
    }
    fetchedUser = user;
    return bcrypt.compare(req.body.pwd, user.password);
  })
  .then(result => {
    if(!result) {
      return res.status(404).json({
        message: 'Invalid credentials... PLease enter valid credentials !'
      });
    }
    const token = jwt.sign({name: fetchedUser.name, id: fetchedUser._id},
      'this-key-should-be-very-long',
      {expiresIn: '1h'});
    res.status(200).json({
      message: "User login is successfull !",
      token: token,
      expiresIn: 3600,
      user: fetchedUser
    });
  })
}

exports.getUsers = (req, res, next) => {
  User.find()
  .then(users => {
    res.status(200).json({
      message: 'All users have been fetched successfully !!',
      users: users
    })
  })
  .catch(error => {
    console.log(error);
    res.status(404).json({
      message: 'Fetching of users failed !!!'
    })
  })
}

exports.deleteUser = (req, res, next) => {
  User.deleteOne({name: req.body.userName})
  .then(result => {
    if (result) {
      return User.find();
    }
  })
  .then(result => {
    res.status(200).json({
      message: 'User has been removed sucessfully',
      users: result
    })
  })
  .catch(error => {
    console.log(error);
    res.status(404).json({
      message: 'User deletion unsucessfull !!'
    })
  })
}
