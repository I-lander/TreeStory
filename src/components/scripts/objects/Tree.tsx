import Init from '../Init.js';

export class Tree {
  x: any;
  y: any;
  img: HTMLImageElement;
  tag: string;
  init: any;
  constructor(x: number, y: number, init: Init) {
    this.x = x;
    this.y = y;
    this.img = document.getElementById('tree') as HTMLImageElement;
    this.tag = 'tree';
    this.init = init;
  }

  draw() {
    const screenX = this.x - this.init.camera.x;
    const screenY = this.y - this.init.camera.y;

    this.init.ctx.drawImage(this.img, screenX, screenY, 6144 / 2, 6144 / 2);
  }

  update() {
    this.draw();
  }
}
