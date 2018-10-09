'use strict'

class Player  {
  constructor (canvas, x, y) {
  const self = this;

  self.x = x;
  self.y = y;
  self.radius = 45;
  self.size = 10;
  self.canvas = canvas;
  self.ctx = canvas.getContext('2d');
  self.isAlive = true;
  self.time = 0;
  self.img = new Image();
  self.isFixed = false;
  self.timestamp = 0;
  self.img.src = "imagenes/luna_nueva.png"
}

draw () {
  const self = this;

  self.ctx.drawImage(self.img, self.x - self.radius, self.y - self.radius, 100, 100);
} 

colision (myBall) {
  const self = this;

  if (self.isFixed) {
    const dx = (self.x) - (myBall.x );
    const dy = (self.y) - (myBall.y );
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < self.radius + myBall.radius) {
        return true;
    }
    return false;
  }
}

killMe () {
  const self = this;

  self.isFixed = true;
  self.timestamp = Date.now();
  
}
}











 








