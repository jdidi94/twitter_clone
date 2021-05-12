const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/auth-routes")

const  app = express();
const cors = require('cors')
const morgan = require("morgan");
const socketio=require('socket.io')
const http=require('http')
const server=http.createServer(app)
const io=socketio(server)

app.use(morgan("combined"));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
const mongoose = require("mongoose");

const mongoUri = 'mongodb://localhost/twitter';

const db=mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log("hey i'm connected")
})
// io.on("connection",socket=>{
//   console.log("new web socket")
//   socket.on('save-message', function (data) {
//   console.log(data);
//   io.emit('new-message', { message: data });
  
//   });
// })
app.use(bodyParser.json());
app.use("/api/user", userRoutes);


app.listen(3001, function () {
  console.log("listening on port 3000!");
});