const websocket = require('../websocket');

exports.emit = function(req, res, next) {
  console.log("emit", req.body);
  websocket.io().emit('action', req.body);
  res.status(200).json({status:"ok"})
}

