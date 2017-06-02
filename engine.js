var Engine = {};
var pressedKeys = [];

Engine.canvas = {};
Engine.marble = {};

Engine.canvas.width = 600;
Engine.canvas.height = 400;

Engine.marble.radius = 15;
Engine.marble.xPos = 0;
Engine.marble.yPos = 0;
Engine.marble.xVel = 0;
Engine.marble.yVel = 0;

Engine.marble.velLimit = 10;



$(document).ready(function(){
  $('#canvas').css({
    'width': Engine.canvas.width,
    'height': Engine.canvas.height
  });
  $('#marble').css({
    'width': Engine.marble.radius * 2,
    'height': Engine.marble.radius * 2,
    'border-radius': Engine.marble.radius
  });
});

Engine.updateVelocity = function() {
  if (pressedKeys.indexOf('s') > -1 && Engine.marble.yVel < Engine.marble.velLimit) { Engine.marble.yVel++; }
  if (pressedKeys.indexOf('w') > -1 && Engine.marble.yVel > -Engine.marble.velLimit) { Engine.marble.yVel--; }
  if (pressedKeys.indexOf('d') > -1 && Engine.marble.xVel < Engine.marble.velLimit) { Engine.marble.xVel++; }
  if (pressedKeys.indexOf('a') > -1 && Engine.marble.xVel > -Engine.marble.velLimit) { Engine.marble.xVel--; }
}

Engine.applyCollisions = function() {
  if (Engine.marble.xPos < 0 || Engine.marble.xPos + (Engine.marble.radius * 2) > Engine.canvas.width) {
    Engine.marble.xVel = -Engine.marble.xVel;
  }
  if (Engine.marble.yPos < 0 || Engine.marble.yPos + (Engine.marble.radius * 2) > Engine.canvas.height) {
    Engine.marble.yVel = -Engine.marble.yVel;
  }
}

Engine.draw = function() {
  $('#marble').css({
    'left': Engine.marble.xPos,
    'top': Engine.marble.yPos
  });
};

Engine.update = function() {
  Engine.updateVelocity();
  Engine.marble.xPos += Engine.marble.xVel;
  Engine.marble.yPos += Engine.marble.yVel;
  Engine.applyCollisions();
};

Engine.run = function() { // While the game is running
  Engine.update();        // Update Entities (e.g. Position)
  Engine.draw();          // Draw Entities to the Screen
}

Engine.fps = 25;

// Start the game loop

Engine.start = function() {
  console.log('starting');
  Engine._intervalId = setInterval(Engine.run, 1000 / Engine.fps);
  Engine.isRunning = true;
}

Engine.stop = function() {
  console.log('stopping');
  clearInterval(Engine._intervalId);
  Engine.isRunning = false;
}



document.onkeydown = function(e) {
  if ('wasd'.indexOf(e.key) > -1 && pressedKeys.indexOf(e.key) === -1) {
    pressedKeys.push(e.key);
  } else if (e.key === 'r') {
    if (!Engine.isRunning) {
      Engine.start();
    } else {
      Engine.stop();
    }
  }
}

document.onkeyup = function(e) {
  if (pressedKeys.indexOf(e.key) > -1)
    pressedKeys.splice(pressedKeys.indexOf(e.key), 1);
}