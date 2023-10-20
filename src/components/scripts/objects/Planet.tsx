import Init from '../Init.js';

export class Planet {
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
  text: string;
  speed: any;
  oldSpeed: any;
  id: string;

  constructor(xAbsolute: number, yAbsolute: number, init: Init) {
    this.xAbsolute = xAbsolute;
    this.yAbsolute = yAbsolute;
    this.init = init;
    this.x = 0;
    this.y = 0;
    this.radius = 100;
    this.initRadius = 100;
    this.maxDist = 300;
    this.color = Math.random() * 360;
    this.image = document.getElementById("delement-img");
    this.id = "delement";
    this.text =
      "<h3 style='text-align:center'>Délements</h3>" +
      "<p>Délements est un jeu développé sur Unity." +
      "C'est à ce jour ma dernière création, il témoigne donc de toute mon expérience acquise.<br>" +
      "Mon but en me lançant dans ce projet était d'apprendre le C#.<br>" +
      "Disponible gratuitement sur : <br> <a class='link' href='https://play.google.com/store/apps/details?id=com.donkeysisle.diceychess' target='_blank'><img class='repo-link' src='./Sources/Images/playStore.png'></a>" +
      "Le lien du repo Github :<br> <a class='link' href='https://github.com/I-lander/Delements/' target='_blank'><img class='repo-link' src='./Sources/Images/GitHub-white.png'></a>" +
      "</p>";
  }
  

  draw(ctx: CanvasRenderingContext2D) {
    const screenX = this.x - this.init.camera.x;
    const screenY = this.y - this.init.camera.y;

    if (this.image) {
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
      if (!planetText) {
        planetText = document.createElement('div');
        planetText.id = this.id;
        planetText.classList.add('planetText');
        if (planetText.innerHTML == '') {
          planetText.innerHTML = this.text;
        }
        planetText.style.position = 'fixed';
        planetText.style.zIndex = '10000';
        document.body.appendChild(planetText);
        const links = document.querySelectorAll('.link');
        if (links) {
          links.forEach(function (link) {
            link.addEventListener('touchstart', function (e) {
              console.log('Touched!');

              let targetElement = e.target as any;
              if ( targetElement &&
                targetElement.tagName.toLowerCase() === 'img' &&
                targetElement.parentElement.tagName.toLowerCase() === 'a'
              ) {
                targetElement = targetElement.parentElement;
              }
              if (targetElement.tagName.toLowerCase() === 'a') {
                window.open(targetElement.href, '_blank');
              }
            });
          });
        }
      }
      planetText.style.width = `${textSize}px`;
      planetText.style.height = `${textSize}px`;
      planetText.style.left = `${screenX - textSize / 2}px`;
      planetText.style.top = `${screenY - textSize / 2}px`;
      ctx.save();
      ctx.fillStyle = 'rgba(32, 32, 34, 0.95)';
      ctx.beginPath();
      ctx.arc(screenX, screenY, this.radius, 0, 2 * Math.PI);
      ctx.fill();
      ctx.restore();
    }
  }

  update() {
    this.x = this.init.limit.x + this.xAbsolute * this.init.limit.width;
    this.y = this.init.limit.y + this.yAbsolute * this.init.limit.height;

    if(this.x && this.y)
    this.draw(this.init.ctx);

    this.detectCollision();
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
