let color, size;

let socket = io();

socket.on("init", initFunction);
socket.on("mouseBroadcast", otherMouse);

function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
  background("black");
  console.log("socket:", socket.id);
}

function initFunction(data) {
  console.log("init", data);
  color = data.color;
  size = data.size;
  initialised = true;
}

function otherMouse(data) {
  console.log("received", data);
  fill(data.color);
  ellipse(data.x, data.y, data.size);
}

function draw() {
  // put drawing code here
}

function mouseMoved() {
  fill(color);
  ellipse(mouseX, mouseY, size);
  let message = { x: mouseX, y: mouseY, color: color, size: size };
  socket.emit("mouse", message);
}
