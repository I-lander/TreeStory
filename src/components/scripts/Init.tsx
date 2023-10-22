import { Dispatch, SetStateAction } from 'react';
import { Owl, TheBatAndTheWorm, TheSnakeAndTheSpider } from './Stories';
import { Butterfly } from './objects/Butterfly';
import { Tree } from './objects/Tree';

class Init {
  [key: string]: any;

  worldObjects: any[];
  weapon: any;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  map: any[];
  mapSize: number;
  delta: number;
  setDebugInfo: Dispatch<SetStateAction<string>>;
  camera: { x: number; y: number; width: number; height: number };
  limit: { id: string; x: number; y: number; width: number; height: number };

  constructor(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    isGamePaused: React.RefObject<boolean>,
    setDebugInfo: Dispatch<SetStateAction<string>>,
  ) {
    this.isGamePaused = isGamePaused;
    this.worldObjects = [];
    this.map = [];
    this.mapSize = 8;
    this.delta = 0;
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouseX = 0;
    this.mouseY = 0;
    this.mouseDown = false;
    this.camera = {
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    };
    this.backgroundSize = innerHeight * 6;
    this.limit = {
      id: 'limit',
      x: -this.backgroundSize / 4 + innerWidth / 2,
      y: -this.backgroundSize / 2 + innerHeight,
      width: this.backgroundSize / 2,
      height: this.backgroundSize / 2,
    };
    this.setDebugInfo = setDebugInfo;

    window.addEventListener('click', (e) => {
      const worldX = e.clientX + this.camera.x;
      const worldY = e.clientY + this.camera.y;

      const percentX = ((worldX - this.limit.x) / this.limit.width) * 100;
      const percentY = ((worldY - this.limit.y) / this.limit.height) * 100;

      console.log(`X: ${percentX}%, Y: ${percentY}%`);
    });

    window.addEventListener('mousedown', (e: any) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'img' ||
        e.target.tagName.toLowerCase() === 'button'
      ) {
        return;
      }
      this.mouseDown = true;
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      this.mouseDown = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.mouseDown) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      }
    });

    window.addEventListener('touchstart', (e: any) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'img' ||
        e.target.tagName.toLowerCase() === 'button'
      ) {
        return;
      }
      this.mouseDown = true;
      this.mouseX = e.touches[0].clientX;
      this.mouseY = e.touches[0].clientY;
    });

    window.addEventListener(
      'touchend',
      (e) => {
        this.mouseDown = false;
        e.preventDefault();
      },
      { passive: false },
    );

    window.addEventListener(
      'touchmove',
      (e) => {
        if (this.mouseDown) {
          this.mouseX = e.touches[0].clientX;
          this.mouseY = e.touches[0].clientY;
        }
        e.preventDefault();
      },
      { passive: false },
    );
  }

  init() {
    this.worldObjects = [
      new Tree(
        -this.backgroundSize / 4 + innerWidth / 2,
        -this.backgroundSize / 2 + innerHeight,
        this,
      ),
      new Butterfly(innerWidth / 2, innerHeight / 2, this),
      new Owl(0.23, 0.48, this),
      new TheBatAndTheWorm(0.78, 0.47, this),
      new TheSnakeAndTheSpider(0.35, 0.14, this),
    ];
  }

  reset() {}

  update() {}

  drawWorld() {
    for (var i = 0; i < this.worldObjects.length; i++) {
      var obj = this.worldObjects[i];
      obj.update();
    }
  }
}

export default Init;
