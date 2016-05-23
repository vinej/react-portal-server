const Todo = require('../models/todo');

exports.query = function(req, res, next) {
	var filter = {};
	if (req.query.filter) {
		filter.desc = { '$regex' : '.*' + req.query.filter + '.*' }; 
	}
	Todo.find( filter, function(err, todos) {
		if (err) { return next(err); }
	  res.send(todos);
	});
}

exports.one = function(req, res, next) {
	//console.log(currentUser);
	Todo.find( { _id: req.params.id }, function(err, todo) {
		if (err || !todo || todo.length == 0) { return next(err); }
		if (!todo) { res.status(404).send('Cannot GET /todos/'+req.params.id); }
	  res.send(todo);
	});
}

exports.delete = function(req, res, next) {
	Todo.find( { _id: req.params.id }, function(err, todo) {
		if (err || !todo || todo.length == 0) { return next(err); }
		Todo.remove( { _id: req.params.id }, function(err) {
			if (err) { 
				res.status(400).send('delete error, unable to delete the id');		
			} else {
				res.status(200).json({status:"ok"});
			}
		});
	});
}

exports.add = function(req, res, next) {
	Todo( req.body ).save( function(err) {
		if (err) { return next(err); }
		res.status(200).json({status:"ok"});
	});
}

exports.update = function(req, res, next) {
	var ptodo = req.body;
	Todo.findById( ptodo._id, function(err, todo) {
		if (err || !todo || toto.length == 0) { return next(err); }
		todo.date = ptodo.date;
		todo.desc = ptodo.desc;
		todo.save(function(err) {
			if (err) { return next(err); }
			res.status(200).json({status:"ok"});
		});
	});
}
