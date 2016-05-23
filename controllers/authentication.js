const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.users = function(req, res, next) {
  list = [];
  for(var i = 0; i < 100; i++) {
    list.push(
      { "_id" : `${i}`, "email" : `test${i}@hotmail.ca`, "name" : `My name${i}`}
    );
  }
  res.send(list)
}

exports.currentUser = '';

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  //currentUser = req.user.email;
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
      currentUser = email;
      res.json({ token: tokenForUser(user) });
    });
  });
}
