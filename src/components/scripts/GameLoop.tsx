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

    this.delta = timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    /////////////////////////////////////////////
    this.Init.drawWorld();

    if (this.Init.mouseDown) {
      var speed = 5; // This is in units per second.
      var distanceToMoveThisFrame = speed * (this.delta / 10) / window.devicePixelRatio || 1;; // Movement this frame.

      var dx = this.Init.mouseX - innerWidth / 2;
      var dy = this.Init.mouseY - innerHeight / 2;
      var distance = Math.sqrt(dx * dx + dy * dy);

      const futurPosX =
        this.Init.camera.x + (dx / distance) * distanceToMoveThisFrame;
      const futurPosY =
        this.Init.camera.y + (dy / distance) * distanceToMoveThisFrame;

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
    /////////////////////////////////////////////

    requestAnimationFrame(this.animate);
  };

  reset() {
    this.Init.reset();
    this.Init.init();
  }
}

export default GameLoop;
