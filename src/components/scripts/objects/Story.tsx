import Init from '../Init';

export class Story {
  xAbsolute: any;
  yAbsolute: any;
  init: any;
  x: number;
  y: number;
  radius: number;
  initRadius: number;
  maxDist: number;
  color: number;
  image: any;
  text: string | undefined;
  speed: any;
  oldSpeed: any;
  img: HTMLImageElement | undefined;
  id: string | undefined;
  audioPlayed: boolean | undefined;
  audio: HTMLAudioElement | undefined;

  constructor(xAbsolute: number, yAbsolute: number, init: Init) {
    this.xAbsolute = xAbsolute;
    this.yAbsolute = yAbsolute;
    this.init = init;
    this.x = 0;
    this.y = 0;
    this.radius = this.init.backgroundSize / 30;
    this.initRadius = this.init.backgroundSize / 30;
    this.maxDist = this.radius * 2;
    this.color = Math.random() * 360;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const screenX = this.x - this.init.camera.x;
    const screenY = this.y - this.init.camera.y;
    if (!this.id) {
      console.log('sss');
      
      return;
    }
    if (this.image ) {
      ctx.drawImage(
        this.image,
        screenX - this.radius,
        screenY - this.radius,
        this.radius * 2,
        this.radius * 2,
      );
    } else {
      let planetText = document.getElementById(this.id);
      const textSize = this.maxDist + 25;
      if (!planetText && this.text) {
        planetText = document.createElement('div');
        planetText.id = this.id;
        planetText.classList.add('storyText');
        if (planetText.innerHTML == '') {
          planetText.innerHTML = this.text;
        }
        planetText.style.position = 'fixed';
        planetText.style.zIndex = '10000';
        document.body.appendChild(planetText);
      }
      if (planetText) {
        planetText.style.width = `${textSize}px`;
        planetText.style.height = `${textSize}px`;
        planetText.style.left = `${screenX - textSize / 2}px`;
        planetText.style.top = `${screenY - textSize / 2}px`;
        ctx.save();
        ctx.fillStyle = 'hsl(202, 100%, 98%)';
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = 'hsla(202, 100%, 71%, 1)';
        ctx.stroke();
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  update() {
    this.x = this.init.limit.x + this.xAbsolute * this.init.limit.width;
    this.y = this.init.limit.y + this.yAbsolute * this.init.limit.height;

    if (this.x && this.y) this.draw(this.init.ctx);

    this.detectCollision();

    if (!this.image) {
      if (this.audio && !this.audioPlayed) {
        this.audio.volume = 1.0;
        this.audio.play();
        this.audioPlayed = true;
      }
    } else {
      if (this.audio && this.audioPlayed) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audioPlayed = false;
      }
    }
  }

  detectCollision() {
    const growSpeed = 3.3;

    var dx = this.x - this.init.camera.x - innerWidth / 2;
    var dy = this.y - this.init.camera.y - innerHeight / 2;
    var distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= this.radius) {
      const thisPlanetIndex = this.init.worldObjects.indexOf(this);
      const [thisPlanet] = this.init.worldObjects.splice(thisPlanetIndex, 1);
      this.init.worldObjects.push(thisPlanet);

      if (this.text) {
        if (this.radius <= this.maxDist) {
          this.radius += growSpeed;
        }
        if (this.radius >= this.maxDist) {
          this.image = '';
        }
      }
    }
    if (distance > this.radius) {
      if (this.text) {
        if (this.radius >= this.initRadius) {
          const text = document.getElementById(`${this.id}`);
          if (text) {
            text.remove();
          }
          this.image = document.getElementById(`${this.id}-img`);
          this.radius -= growSpeed;
        }
      }
    }
    if (this.text) {
      if (distance >= this.radius) {
        this.speed = this.oldSpeed;
      }
    }
  }
}
