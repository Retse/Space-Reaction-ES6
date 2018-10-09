'use strict'

class Ball {
  constructor (canvas, x, y, dx, dy) {
  const self = this;

  self.x = x;
  self.y = y;
  self.dx = dx;
  self.dy = dy;
  self.color;
  self.radius = 7;
  self.size = 7;
  self.speed = 1.5;
  self.canvas = canvas;
  self.maxHeight = canvas.height;
  self.maxWidth = canvas.width;
  self.ctx = canvas.getContext('2d');
  self.img = new Image();
  self.img.src = "imagenes/meteorito_1.png"
    
  }
  
  draw () {
    const self = this;
    
    self.ctx.drawImage(self.img, self.x - self.radius*1.5, self.y - self.radius*1.5, 20,20);
    
  } 

  update () {
    const self = this;
  
    self.x = self.x + (self.speed * self.dx);
    self.y = self.y + (self.speed * self.dy);
  
    self._checkLimits();
  }
  
  _checkLimits () {
    const self = this;
      
      if (self.x + self.radius > self.maxWidth || self.x - self.radius < 0) {
        self.dx = self.dx * -1;
        
      } 
    
      if (self.y + self.radius > self.maxHeight || self.y - self.radius < 0 ) {
        self.dy = self.dy * -1;
      }

  }
}



