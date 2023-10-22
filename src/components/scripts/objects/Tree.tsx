import Init from '../Init.js';

export class Tree {
  x: any;
  y: any;
  img: HTMLImageElement;
  tag: string;
  init: any;
  width: any;
  height: any;
  constructor(x: number, y: number, init: Init) {
    this.x = x;
    this.y = y;
    this.img = document.getElementById('tree-img') as HTMLImageElement;
    this.tag = 'tree';
    this.init = init;
  }

  draw() {
    const screenX = this.x - this.init.camera.x;
    const screenY = this.y - this.init.camera.y;

    this.init.ctx.drawImage(
      this.img,
      screenX,
      screenY,
      this.height,
      this.height,
    );
  }

  update() {
    this.x = this.init.limit.x;
    this.y = this.init.limit.y;
    this.width = this.init.limit.width;
    this.height = this.init.limit.height;
    this.draw();
  }
}
