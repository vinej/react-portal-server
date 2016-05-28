const websocket = require('../websocket');

exports.action = function(req, res, next) {
  console.log("emit", req.body);
  websocket.io().emit('action', req.body);
  res.status(200).json({status:"ok"})
}

