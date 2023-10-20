import { Dispatch, SetStateAction } from 'react';
import Init from './Init';

class GameLoop {
  delta: number;
  lastFrameTimeMs: number;
  maxFPS: number;
  deltaFactor: number;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  Init: Init;
  setDebugInfo: string | undefined;
  this: any;

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    isGamePaused: React.RefObject<boolean>,
    setDebugInfo: Dispatch<SetStateAction<string>>,
  ) {
    this.delta = 0;
    this.lastFrameTimeMs = 0;
    this.maxFPS = 90;
    this.deltaFactor = 1;
    this.canvas = canvas;
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';

    this.Init = new Init(this.canvas, this.ctx, isGamePaused, setDebugInfo);
  }

  animate = () => {
    const timestamp = Date.now();

    if (timestamp < this.lastFrameTimeMs + 1000 / this.maxFPS) {
      requestAnimationFrame(this.animate);
      return;
    }

    this.lastFrameTimeMs = timestamp;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    /////////////////////////////////////////////
    this.Init.drawWorld();

    if (this.Init.mouseDown) {
      var speed = 8;
      var dx = this.Init.mouseX - innerWidth / 2;
      var dy = this.Init.mouseY - innerHeight / 2;
      var distance = Math.sqrt(dx * dx + dy * dy);

      const futurPosX = this.Init.camera.x + (dx / distance) * speed;
      const futurPosY = this.Init.camera.y + (dy / distance) * speed;

      if (
        futurPosX + this.Init.camera.width / 2 >= this.Init.limit.x &&
        futurPosX + this.Init.camera.width / 2 <=
          this.Init.limit.x + this.Init.limit.width &&
        futurPosY + this.Init.camera.height / 2 >= this.Init.limit.y &&
        futurPosY + this.Init.camera.height / 2 <=
          this.Init.limit.y + this.Init.limit.height
      ) {
        this.Init.camera.x = futurPosX;
        this.Init.camera.y = futurPosY;
      }
    }
    var screenX = this.Init.limit.x - this.Init.camera.x;
    var screenY = this.Init.limit.y - this.Init.camera.y;
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.rect(
      screenX,
      screenY,
      this.Init.limit.width,
      this.Init.limit.height,
    );
    this.ctx.setLineDash([10, 10]);
    this.ctx.lineWidth = 5;
    this.ctx.strokeStyle = 'hsla(0, 64%, 60%, 1)';
    this.ctx.stroke();
    this.ctx.restore();

    
    /////////////////////////////////////////////

    requestAnimationFrame(this.animate);
  };

  reset() {
    this.Init.reset();
    this.Init.init();
  }
}

export default GameLoop;
