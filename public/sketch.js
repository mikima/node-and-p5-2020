let color, size;
let initialised = false;

let socket = io();

socket.on("init", initFunction);
socket.on("mouseBroadcast", otherMouse);
socket.on("welcome", printWelcome);

function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // put setup code here
  noStroke();
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

function printWelcome(message) {
  textAlign(CENTER, CENTER);
  fill("black");
  rectMode(CENTER);
  rect(width / 2, height / 2, 300, 30);
  fill(message.color);
  text(message.color + " just joined", width / 2, height / 2);
}

function draw() {
  // draw background to create 'fade' effect
  background(0, 5);
  // as soon as the welcome message is received,
  // print it
  if (initialised) {
    background("black");
    fill(color);
    textAlign(CENTER, CENTER);
    text("Welcome " + color, width / 2, height / 2);
    initialised = false;
  }
}

function mouseMoved() {
  fill(color);
  ellipse(mouseX, mouseY, size);
  let message = { x: mouseX, y: mouseY, color: color, size: size };
  socket.emit("mouse", message);
}
