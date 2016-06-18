const Dashboard = require('../models/dashboard');

exports.query = function(req, res, next) {
  var filter = {};
  if (req.query.filter) {
    filter.description = { '$regex' : '.*' + req.query.filter + '.*' }; 
  }
  filter.userid = req.user.email;
  filter.project = req.user.project;
  Dashboard.find( filter, function(err, dashboards) {
    if (err) { return next(err); }
    res.send(dashboards);
  });
}

exports.one = function(req, res, next) {
  //console.log(currentUser);
  Dashboard.find( { _id: req.params.id }, function(err, dashboard) {
    if (err || !dashboard || dashboard.length == 0) { return next(err); }
    if (!dashboard) { res.status(404).send('Cannot GET /dashboard/'+req.params.id); }
    res.send(dashboard);
  });
}

exports.delete = function(req, res, next) {
  Dashboard.find( { _id: req.params.id }, function(err, dashboard) {
    if (err || !dashboard || dashboard.length == 0) { return next(err); }
    Dashboard.remove( { _id: req.params.id }, function(err) {
      if (err) { 
        res.status(400).send('delete error, unable to delete the id');    
      } else {
        res.status(200).json({status:"ok"});
      }
    });
  });
}

exports.add = function(req, res, next) {
  var pdashboard = req.body;
  var dashboard = new Dashboard();
  // keep only fields from the schema
  dashboardfill(pdashboard, dashboard, req.user.email, req.user.project);
  Dashboard( dashboard ).save( function(err, dashboard) {
    if (err) { return next(err); }
    res.send(dashboard);
  });
}

exports.update = function(req, res, next) {
  var pdashboard = req.body;
  console.log(pdashboard)
  Dashboard.findById( pdashboard._id, function(err, dashboard) {
    if (err || !dashboard || dashboard.length == 0) { return next(err); }
    // update only fields from the schema
    dashboardfill(pdashboard, dashboard, req.user.email, req.user.project);
    dashboard.save(function(err) {
      if (err) { return next(err); }
      res.send(dashboard);
    });
  });
}

dashboardfill = function(src, dst, userid, project) {
  dst.userid = userid;
  dst.project = project;
  dst.title = src.title;
  dst.isHidden = src.isHidden;
  dst.widgets = [];
  if (src.widgets && src.widgets.length > 0) {
    var count = 1
    src.widgets.forEach( function(widget) { 
      // result internal reference
      widget.i = "ref" + count;
      count = count + 1;
      delete widget['_id'];
      dst.widgets.push(widget)
    });
  }
}