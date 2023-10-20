import Init from '../Init';

export class Ship {
  x: any;
  oldX: any;
  y: any;
  oldY: any;
  sprite: HTMLImageElement | null;
  spriteSize: number;
  particles: Particles[];
  angle: any;
  tag: string;
  init: Init;
  constructor(x: number, y: number, init: Init) {
    this.x = x;
    this.oldX = x;
    this.y = y;
    this.oldY = y;
    this.sprite = document.getElementById('shipSprite') as HTMLImageElement;
    this.spriteSize = 100;
    this.particles = [];
    this.angle;
    this.tag = 'ship';
    this.init = init;
  }
  emitParticles() {
    const numParticles = 50;
    if (this.particles.length >= numParticles || !this.init.mouseDown) {
      return;
    }
    let dx = this.oldX - this.x;
    let dy = this.oldY - this.y;

    let len = Math.sqrt(dx * dx + dy * dy);
    dx /= len;
    dy /= len;

    this.particles.push(
      new Particles(
        this.x + this.init.camera.x,
        this.y + this.init.camera.y,
        this.init,
      ),
    );
  }
  draw(ctx: CanvasRenderingContext2D) {
    var relativeMouseX = this.init.mouseX - this.x;
    var relativeMouseY = this.init.mouseY - this.y;

    this.angle = Math.atan2(relativeMouseY, relativeMouseX) + Math.PI / 2;
    if (!this.sprite) {
      return;
    }
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    this.emitParticles();
    ctx.drawImage(
      this.sprite,
      -this.spriteSize / 2,
      -this.spriteSize / 2,
      this.spriteSize,
      this.spriteSize,
    );
    ctx.restore();
  }
  update() {
    this.draw(this.init.ctx);

    for (var i = 0; i < this.init.worldObjects.length; i++) {
      var obj = this.init.worldObjects[i];
      if (obj.tag && obj.tag === 'sun') {
        this.drawCompass(this.init.ctx, obj);
      }
    }
  }

  drawCompass(ctx: CanvasRenderingContext2D, sun: any) {
    const compassSize = 50;
    const dx = sun.x - this.init.camera.x - this.x;
    const dy = sun.y - this.init.camera.y - this.y;

    const compassAngle = Math.atan2(dy, dx);
    const image = document.getElementById('compass') as HTMLImageElement;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(compassAngle + Math.PI / 2);
    ctx.drawImage(
      image,
      -compassSize / 2,
      -compassSize / 2 - 100,
      compassSize,
      compassSize,
    );
    ctx.restore();
  }
}

export class Particles {
  x: any;
  y: any;
  radius: number;
  velocity: { x: number; y: number };
  init: Init;
  constructor(x: number, y: number, init: Init) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 8;
    this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
    this.init = init;
  }

  draw() {
    this.init.ctx.save();
    this.init.ctx.fillStyle = 'white';
    this.init.ctx.beginPath();
    this.init.ctx.arc(
      this.x - this.init.camera.x,
      this.y - this.init.camera.y,
      this.radius,
      0,
      2 * Math.PI,
    );
    this.init.ctx.fill();
    this.init.ctx.restore();
  }

  update() {
    this.draw();
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.radius -= 0.1;
  }
}
