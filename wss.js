var WebSocketServer = require("ws").Server
var http = require("http")
var express = require("express")
var app = express()
var port = 5000

app.use(express.static(__dirname + "/"))

var server = http.createServer(app)
server.listen(port)

console.log("http server listening on %d", port)

var wss = new WebSocketServer({server: server})
console.log("websocket server created")

wss.on("connection", function(ws) {
  var id = setInterval(function() {
    ws.send( '{ "type": "user_next_page", "store" : "user", payload:"" }' )

    ws.send( '{ function : "actions.storeNextPage(store)", "store" : "user" }' ) }

    , 10000
  )

  console.log("websocket connection open")

  ws.on("close", function() {
    console.log("websocket connection close")
    clearInterval(id)
  })
})
