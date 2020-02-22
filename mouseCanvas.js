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
window.onload = function myfunction() {
  canvas = document.getElementById("mouse-path");
  canvasContext = canvas.getContext("2d");

  for (var i = 0; i < 10; i++) {
    tracePoints[i] = new TracePoint(
      window.innerWidth / 2,
      window.innerHeight / 2
    );
  }

  resize();
  animate();
};

window.onresize = function() {
  resize();
};

function resize() {
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;

  // TODO recalculate points position or update them to match mouse position?
}

function TracePoint(x, y) {
  this.x = x;
  this.y = y;
  this.color = generateRandomColor();
  this.theta = Math.random() * Math.PI * 2;
  this.radius = Math.random() * 150;
}

TracePoint.prototype.draw = function() {
  const previousPosition = {
    x: this.x,
    y: this.y
  };

  this.theta += 0.02; // TODO move ot const - this is "spin coevicient"

  // calculate new position
  this.x = mousePosition.x + Math.cos(this.theta) * this.radius;
  this.y = mousePosition.y + Math.sin(this.theta) * this.radius;
  canvasContext.beginPath();
  canvasContext.lineWidth = 4; // TODO move to const
  canvasContext.strokeStyle = this.color;
  canvasContext.moveTo(previousPosition.x, previousPosition.y);
  canvasContext.lineTo(this.x, this.y);
  canvasContext.stroke();
  canvasContext.closePath();
};

function animate() {
  requestAnimationFrame(animate);
  canvasContext.fillStyle = "rgba(0,0,0,0.05)";
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  tracePoints.forEach(function(tracePoint, i) {
    tracePoint.draw();
  });
}
