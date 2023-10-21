import Init from '../Init';
import { getRandom } from '../Utils';

export class Butterfly {
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
    this.sprite = document.getElementById('butterfly') as HTMLImageElement;
    this.init = init;
    this.spriteSize = this.init.backgroundSize / 20;
    this.particles = [];
    this.angle;
    this.tag = 'ship';
  }

  emitParticles() {
    const numParticles = 100;
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
    // for (var i = 0; i < this.init.worldObjects.length; i++) {
    //   var obj = this.init.worldObjects[i];
    //   if (obj.tag && obj.tag === 'sun') {
    //     this.drawCompass(this.init.ctx, obj);
    //   }
    // }

    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      if (particle.radius <= 0) {
        this.particles.splice(i, 1);
        i--;
        continue;
      }
      particle.update();
    }
    this.draw(this.init.ctx);
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
  color: string;
  hue: number;
  constructor(x: number, y: number, init: Init) {
    this.x = x;
    this.y = y;
    this.init = init;
    this.radius = (Math.random() * this.init.backgroundSize) / 500;
    this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
    this.hue = getRandom(0, 360);
    this.color = `hsl(${this.hue}, 85%, 75%)`;
  }

  draw() {
    this.init.ctx.save();
    this.init.ctx.fillStyle = this.color;
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
    this.hue += 3;
    this.color = `hsl(${this.hue}, 85%, 75%)`;
  }
}
