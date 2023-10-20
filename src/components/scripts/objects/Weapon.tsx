import Init from '../Init';
import { getRandom } from '../Utils';
import TileMap from './TileMap';

export interface weaponContent {
  id: string;
  minStrength: number;
  maxStrength: number;
}

class Weapon {
  img: HTMLImageElement;
  Init: Init;
  TileMap: TileMap;
  faces: {
    top: { id: string; content: weaponContent };
    bottom: { id: string; content: weaponContent };
    up: { id: string; content: weaponContent };
    down: { id: string; content: weaponContent };
    left: { id: string; content: weaponContent };
    right: { id: string; content: weaponContent };
  };
  spriteSize: any;
  x: number;
  y: number;
  startX: number;
  startY: number;
  shuffleCount: number;
  shuffleCountMax: number;
  strenght: any;
  lastShuffleTime: number;
  isReady: boolean;
  hasAttacked: boolean;
  isAnimating: boolean = false;
  targetX: number = 0;
  targetY: number = 0;
  animationCallback: (() => void) | null = null;

  constructor(Init: Init, TileMap: TileMap) {
    this.Init = Init;
    this.x = 0;
    this.y = 0;
    this.startX = 0;
    this.startY = 0;
    this.TileMap = TileMap;
    this.spriteSize = this.TileMap.tileSize;
    this.shuffleCount = 10;
    this.shuffleCountMax = 10;
    this.strenght = 0;
    this.lastShuffleTime = 0;
    this.isReady = false;
    this.hasAttacked = false;
    this.isAnimating = false;

    this.faces = {
      top: {
        id: '1',
        content: { id: 'sword', minStrength: 0, maxStrength: 0 },
      },
      bottom: { id: '6', content: { id: '', minStrength: 0, maxStrength: 0 } },
      up: { id: '5', content: { id: '', minStrength: 0, maxStrength: 0 } },
      down: { id: '2', content: { id: '', minStrength: 0, maxStrength: 0 } },
      left: { id: '3', content: { id: '', minStrength: 0, maxStrength: 0 } },
      right: { id: '4', content: { id: '', minStrength: 0, maxStrength: 0 } },
    };
    this.img = document.getElementById(
      `${this.faces.top.content.id}`,
    ) as HTMLImageElement;
  }

  draw() {
    const ctx = this.Init.ctx;
    this.drawCard(ctx);

    ctx.save();
    ctx.font = `${this.Init.tileSize}px JosefinSans`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    ctx.fillText(
      `${this.strenght === 0 ? '-' : this.strenght}`,
      this.Init.canvas.width / 2 - this.Init.tileSize * 2.25,
      this.Init.canvas.height / 2 - this.Init.tileSize * 1.25,
    );
    ctx.font = `${this.Init.tileSize / 2}px JosefinSans`;

    ctx.fillText(
      `${this.Init.dice.life}`,
      this.Init.canvas.width / 2 - this.Init.tileSize * 2.25,
      this.Init.canvas.height / 2 + this.Init.tileSize * 1.75,
    );
    ctx.restore();

    ctx.drawImage(
      this.img,
      this.x,
      this.Init.canvas.height / 2 - this.Init.tileSize,
      this.Init.tileSize * 2,
      this.Init.tileSize * 2,
    );
  }

  drawCard(ctx: CanvasRenderingContext2D) {
    const battleCard = document.getElementById(
      'battleCard',
    ) as HTMLImageElement;

    ctx.drawImage(
      battleCard,
      this.Init.canvas.width / 2 - this.Init.tileSize * 3.5,
      this.Init.canvas.height / 2 - this.Init.tileSize * 2.5,
      this.Init.tileSize * 2.5,
      this.Init.tileSize * 5,
    );
  }

  update() {
    const timestamp = Date.now();
    this.img = document.getElementById(
      `${this.faces.top.content.id}`,
    ) as HTMLImageElement;

    this.startX = this.Init.battleArea.x;
    this.startY = this.Init.battleArea.y;

    this.spriteSize = this.TileMap.tileSize;
    this.faces = this.Init.dice.faces;

    if (
      this.shuffleCount < this.shuffleCountMax &&
      timestamp - this.lastShuffleTime >= 5 * this.Init.delta
    ) {
      this.strenght = getRandom(
        this.faces.top.content.minStrength,
        this.faces.top.content.maxStrength,
      );

      this.shuffleCount++;
      this.lastShuffleTime = timestamp;
    }
    if (this.shuffleCount >= this.shuffleCountMax && !this.hasAttacked) {
      this.isReady = true;
      this.hasAttacked = true;
    }

    if (!this.isAnimating) {
      this.x = this.Init.canvas.width / 2 - this.Init.tileSize * 3.25;
    }

    if (this.isAnimating) {
      let dx = this.targetX - this.x;
      let dy = this.targetY - this.y;

      const distance = Math.sqrt(dx * dx + dy * dy);
      dx /= distance;
      dy /= distance;

      const speed = 1 * this.Init.delta;
      this.x += dx * speed;
      this.y += dy * speed;

      if (
        Math.abs(this.targetX - this.x) < speed &&
        Math.abs(this.targetY - this.y) < speed
      ) {
        this.isAnimating = false;
        this.x = this.Init.canvas.width / 2 - this.Init.tileSize * 3.25;
      }
    }

    if (!this.isAnimating && this.animationCallback) {
      this.animationCallback();
      this.animationCallback = null;
    }

    this.draw();
  }

  init() {
    this.shuffleCount = 0;
    this.isReady = false;
    this.hasAttacked = false;

    this.targetX = this.Init.canvas.width / 2 + this.Init.tileSize * 1.25;
  }
}

export default Weapon;
