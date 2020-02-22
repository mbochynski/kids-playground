var canvas;
var canvasContext;

const mousePosition = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2
};

window.onmousemove = function(e) {
  mousePosition.x = e.clientX;
  mousePosition.y = e.clientY;
};

function generateRandomColor() {
  var s = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += s[Math.ceil(Math.random() * 15)];
  }
  return color;
}

var tracePoints = [];
var ball;
window.onload = function myfunction() {
  canvas = document.getElementById("mouse-path");
  canvasContext = canvas.getContext("2d");

  resize();

  ball = new Ball();

  animate();
};

function Ball() {
  this.x = mousePosition.x;
  this.y = mousePosition.y;
  this.slices = 12;

  this.colors = Array.from(Array(this.slices), () => generateRandomColor());

  console.log(this.colors);
  this.theta = Math.random() * Math.PI * 2;

  Ball.prototype.draw = function() {
    this.x = mousePosition.x;
    this.y = mousePosition.y;

    this.theta += 0.02; // TODO move ot const - this is "spin coevicient"

    canvasContext.save();

    canvasContext.translate(this.x, this.y);
    canvasContext.rotate(this.theta);

    const slices = this.slices;
    for (let i = 0; i < slices; ++i) {
      canvasContext.rotate((Math.PI * 2) / slices);
      canvasContext.beginPath();
      canvasContext.moveTo(0, 0);
      canvasContext.lineTo(0 + 50, 0);
      canvasContext.arc(0, 0, 50, 0, (Math.PI * 2) / slices, false);
      canvasContext.fillStyle = this.colors[i];
      canvasContext.fill();
    }

    canvasContext.restore();
  };
}

window.onresize = function() {
  resize();
};

function resize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  // TODO recalculate points position or update them to match mouse position?
}

function animate() {
  requestAnimationFrame(animate);
  canvasContext.fillStyle = "rgba(255,255,255,0.25)";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  ball.draw();
}
