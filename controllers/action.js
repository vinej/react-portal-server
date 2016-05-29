const Right = require('../models/right');
const Role = require('../models/role');

exports.actions = function(req, res, next) {
  // 1) get all the roles of the user for the current project
  var filter = {};
  filter.userid = req.user.email;
  filter.project = req.user.project;
  Right.findOne( filter, function(err, right) {
    if (err) { return next(err); }

    if (!right) {
      res.send([])
      return
    }

    // 2) find all the actions of all roles
    Role.find( { name : { $in : right.roles  } }, function(err, listActions) {
      if (err) { return next(err); }

      if (!listActions) {
        res.send([])
      } else {
        // 3) flatten all the actions into one array
        var actions = [];
        listActions.map(function(list) { list.actions.map( function(action) { actions.push(action); }) });
        res.send(actions);
      }
    });
  });
}