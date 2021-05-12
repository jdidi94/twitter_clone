const socketio=require('socket.io')
const express = require("express");
const  app = express();
const http=require('http')
const server=http.createServer(app)
const io=socketio(server)
io.on("connection",socket=>{
  console.log("new web socket")
  socket.on('save-message', function (data) {
  console.log(data);
  io.emit('new-message', data);
  console.log(data)
  });
})
server.listen(4000, function () {
    console.log("listening on port 4000!");
  });