var websocket = {
  tio: null,
  create: function(socketio, http) {
    if (!this.tio) {
      this.tio = socketio(http, {
          origins: "*:*",
          path: "/socketio"
      });
    }
  } ,
  io: function() {
    return this.tio;
  }
}

module.exports = websocket;