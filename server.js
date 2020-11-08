// define the possible colors

const CSS_COLOR_NAMES = [
  "AliceBlue",
  "AntiqueWhite",
  "Aqua",
  "Aquamarine",
  "Azure",
  "Beige",
  "Bisque",
  "BlanchedAlmond",
  "Blue",
  "BlueViolet",
  "Brown",
  "BurlyWood",
  "CadetBlue",
  "Chartreuse",
  "Chocolate",
  "Coral",
];

// import express
let express = require("express");
// import socket.io
let socket = require("socket.io");
// initialise express
let app = express();
// choose port number
let port = process.env.PORT || 3000;
// start the server
let server = app.listen(port);
// define the folde that will be used
// to serve files
app.use(express.static("public"));
// initialise socket.io
let io = socket(server);
// when there is a new connection,
// call the "newConnection" function
io.on("connect", onConnect);

// create the "newConnection" function
function onConnect(socket) {
  // print the id of the new connection
  console.log("new connection:", socket.client.id);
  // select a random color from the array
  let color =
    CSS_COLOR_NAMES[Math.floor(Math.random() * CSS_COLOR_NAMES.length)];
  // choose a random size between 5 and 45
  let size = Math.random() * 40 + 5;
  //send them the client
  socket.emit("init", { color: color, size: size });
  // send a message to all the others
  socket.broadcast.emit("welcome", { color: color });
  // when the client send a message called "mouse"
  // exectute the function "mouseMessage"
  socket.on("mouse", mouseMessage);

  // create the mouseMessage
  function mouseMessage(dataReceived) {
    // broadcat the message to all the others clients
    socket.broadcast.emit("mouseBroadcast", dataReceived);
  }
}
