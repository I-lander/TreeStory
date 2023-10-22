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
  inactiveParticles: Particles[];
  angle: any;
  tag: string;
  init: Init;
  constructor(x: number, y: number, init: Init) {
    this.x = x;
    this.oldX = x;
    this.y = y;
    this.oldY = y;
    this.sprite = document.getElementById('butterfly-img') as HTMLImageElement;
    this.init = init;
    this.spriteSize = this.init.backgroundSize / 20;
    this.particles = [];
    this.inactiveParticles = [];
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

    let particle: Particles;
    if (this.inactiveParticles.length > 0) {
      particle = this.inactiveParticles.pop()!;
      particle.reset(this.x + this.init.camera.x, this.y + this.init.camera.y);
    } else {
      particle = new Particles(
        this.x + this.init.camera.x,
        this.y + this.init.camera.y,
        this.init,
      );
    }
    this.particles.push(particle);
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
    for (let i = 0; i < this.particles.length; i++) {
      const particle = this.particles[i];
      if (particle.radius <= 0) {
        this.inactiveParticles.push(particle);
        this.particles.splice(i, 1);
        i--;
        continue;
      }
      particle.update();
    }
    this.draw(this.init.ctx);
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
    this.radius -= 0.08;
    this.hue += 3;
    this.color = `hsl(${this.hue}, 85%, 75%)`;
  }

  reset(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.radius = (Math.random() * this.init.backgroundSize) / 500;
    this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 2 - 1 };
    this.hue = getRandom(0, 360);
    this.color = `hsl(${this.hue}, 85%, 75%)`;
  }
}
