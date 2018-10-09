'use strict'

class Game {
  constructor (parentElement) {
  const self = this;

  self.parentElement = parentElement;
  self.gameOverCallback = null;

  self.totalPoints = 0;
  self.sound = new Audio('boom.mp3');


  self._init();
  self._startLoop()
}

_init () {
  const self = this;

  self.gameElement = buildDom(`
    <main class="game container">
      <header class="game__header">
        <div class="points">
          <span class="label">Total Points: </span>
          <span class="value"></span>
        </div>
        <h1>Space Reaction</h1>
        <div class="time">
          <span class="label">Time Remaining: </span>
          <span class="value"></span>
        </div>
      </header>
      <div class="game__canvas">
        <canvas class="canvas"></canvas>
      </div>
    </main>
   `)

  self.parentElement.appendChild(self.gameElement);

  self.canvasParentElement = document.querySelector('.game__canvas');
  self.canvasElement = document.querySelector('.canvas');

  self.pointsElement = self.gameElement.querySelector('.points .value');
  self.timeElement = self.gameElement.querySelector('.time .value');

  self.width = self.canvasParentElement.clientWidth;
  self.height = self.canvasParentElement.clientHeight;

  self.canvasElement.setAttribute('width', self.width);
  self.canvasElement.setAttribute('height', self.height);

  self.ctx = self.canvasElement.getContext('2d');

}

_startLoop () {
  const self = this;
  self.player = new Player (self.canvasElement, 100, 100);
  self.balls = [];
  self.playerTimeToLive = 5000;
  self.isGameOver = false;

  self._createBalls();
    
  self.handleMouseMove ((event) => {
    const rect = self.canvasElement.getBoundingClientRect();
    self.player.x = event.clientX - rect.left;
    self.player.y = event.clientY - rect.top;
  })
    
  self.canvasElement.addEventListener('mousemove', self.handleMouseMove)
  
  self.handleMouseClick ((event) => {
    const rect = self.canvasElement.getBoundingClientRect();
    self.player.x = event.clientX - rect.left;
    self.player.y = event.clientY - rect.top;

    self.canvasElement.removeEventListener('mousemove', self.handleMouseMove)
    self.player.killMe();
  })

   self.canvasElement.addEventListener('click', self.handleMouseClick)
   
  function loop() {

    self._clearAll();
    self._updateAll();
    self._drawAll();
   
    if (!self.isGameOver) {
      requestAnimationFrame(loop);
    } else {
      // game over
      self.gameOverCallback();
    }
    
  }

  requestAnimationFrame(loop);

}

_clearAll () {
  const self = this;
  self.ctx.clearRect(0, 0, self.width, self.height);

}

_updateAll () {
  const self = this;

  self.balls.forEach ((item) => {
    item.update();
  });

  self._updateUI();

  self._checkAllCollisions();
  self._checkIfGameIsOver();

}

_drawAll () {
  const self = this;

  self.balls.forEach ((item) => {
    item.draw();
  });

  if (self.player.isAlive) {
    self.player.draw();
  }
}

_createBalls () {
  const self = this;
  const directions = [-1,1];
  for (const i = 0; i < 20 ; i++){
    const randomX = Math.random() * self.width * 0.9;
    const randomY = Math.random() * self.height * 0.9;
    const randomDX = Math.floor(Math.random()*2);
    const randomDY = Math.floor(Math.random()*2);
    self.balls.push(new Ball(self.canvasElement, randomX, randomY, directions[randomDX], directions[randomDY],i));
  }
}

_updateUI () {
  const self = this;
  self.timeElement.innerText = self._getTime();
  self.pointsElement.innerText = self.totalPoints;
}

_getTime () {
  const self = this;
  if (self.player.isFixed) {  
    const currentTime = Date.now();
    const timeConsumed = currentTime - self.player.timestamp;
    const finalTime = self.playerTimeToLive - timeConsumed;
    return Math.floor(finalTime/1000);
  }
  return Math.floor(self.playerTimeToLive / 1000);
}


_checkAllCollisions () {
  const self = this;

  self.balls.forEach ((item, idx) =>  {
    if (self.player.colision(item)) {
      self.sound.currentTime = 0;
      self.balls.splice(idx, 1);
      self.playerTimeToLive += 1000;
      self.totalPoints += 50;
      self.sound.play();
    }
  });
}

_checkIfGameIsOver () {
  const self = this;
  const currentTime = Date.now();
  if (self.player.isFixed && (currentTime - self.player.timestamp > self.playerTimeToLive || self.balls.length === 0)) {
    self.isGameOver = true;

   }

  }

destroy () {
  const self = this;
  self.gameElement.remove();
} 

onOver (callback) {
  const self = this;
  self.gameOverCallback = callback;
}

}










