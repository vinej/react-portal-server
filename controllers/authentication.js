const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.users = function(req, res, next) {
  res.send(
    [
        { "_id" : "1", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "2", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "3", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "4", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "5", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "6", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "7", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "8", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "9", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "10", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "11", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "12", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "13", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "14", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "15", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "16", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "17", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "18", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "19", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "20", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "21", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "22", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "23", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "24", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "25", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "26", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "27", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "28", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "29", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "30", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "31", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "32", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
        { "_id" : "33", "email" : "jyvinet@hotmail.ca", "name" : "Jean-Yves"},
        { "_id" : "34", "email" : "jyvinet2@hotmail.ca", "name" : "Na"},
    ]
  );
  // User.find( {}, function(err, users) { 
  //   res.send( 
  //     users 
  //     ); 
  // });
}

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user), name: req.user.name });
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;

  if (!email || !password || !name) {
    return res.status(422).send({ error: 'You must provide email, password and name'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User({ email, password, name });

    user.save(function(err) {
      if (err) { return next(err); }

      // Repond to request indicating the user was created
      res.json({ token: tokenForUser(user) });
    });
  });
}
