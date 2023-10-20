import Init from '../Init';
import Chests from './Chests';
import { WeaponProto, WeaponsList } from './WeaponsList';

class UiElements {
  Init: Init;
  slots: any[];
  draggedItem: any;
  originalPosition: { x: number; y: number };
  isInit: boolean;
  chestMenu: { x: any; y: any; width: any; height: any };
  chestItem: {
    x: number;
    y: number;
    width: number;
    height: number;
    content: WeaponProto;
    isOpen: boolean;
  };
  isChestInitiated: boolean;

  constructor(Init: Init) {
    this.Init = Init;
    this.slots = [];
    this.draggedItem = null;
    this.originalPosition = { x: 0, y: 0 };
    this.isInit = false;
    this.chestMenu = { x: 0, y: 0, width: 0, height: 0 };
    this.chestItem = {
      x: this.Init.canvas.width / 2 - this.Init.tileSize / 2,
      y: this.Init.canvas.height / 2 - this.Init.tileSize / 2,
      width: this.Init.tileSize,
      height: this.Init.tileSize,
      content: { id: '', life: 0, minStrength: 0, maxStrength: 0 },
      isOpen: false,
    };
    this.isChestInitiated = false;

    window.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    window.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    window.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    window.addEventListener('touchstart', (e) => this.handleMouseDown(e));
    window.addEventListener('touchmove', (e) => this.handleMouseMove(e));
    window.addEventListener('touchend', (e) => this.handleMouseUp(e));
  }

  handleMouseDown(e: any) {
    if (!this.Init.dice.isChestOpen || this.Init.isGamePaused.current) {
      return;
    }
    e.preventDefault();
    const { x, y } = this.getCursorPosition(e);
    const clickedChestItem = this.getItemAt(x, y, [this.chestItem]);

    if (clickedChestItem) {
      this.originalPosition.x = clickedChestItem.x;
      this.originalPosition.y = clickedChestItem.y;
      this.draggedItem = clickedChestItem;
    }
  }

  handleMouseUp(e: any) {
    if (!this.Init.dice.isChestOpen || this.Init.isGamePaused.current) {
      return;
    }
    e.preventDefault();
    const { x, y } = this.getCursorPosition(e);

    if (this.draggedItem === this.chestItem) {
      const targetSlot = this.getItemAt(x, y, this.slots);

      if (targetSlot) {
        targetSlot.content = this.draggedItem.content;
        this.isChestInitiated = false;
        this.Init.dice.isChestOpen = false;
        this.Init.tileMap.map[this.Init.dice.tileY][this.Init.dice.tileX] = '0';
        this.chestItem.isOpen = true;
        this.draggedItem.x = this.originalPosition.x;
        this.draggedItem.y = this.originalPosition.y;
      } else {
        this.draggedItem.x = this.originalPosition.x;
        this.draggedItem.y = this.originalPosition.y;
      }
      this.draggedItem = null;
    }
  }

  handleMouseMove(e: any) {
    if (!this.Init.dice.isChestOpen || this.Init.isGamePaused.current) {
      return;
    }
    e.preventDefault();
    const { x, y } = this.getCursorPosition(e);

    if (this.draggedItem) {
      this.chestItem.x = x - this.chestItem.width / 2;
      this.chestItem.y = y - this.chestItem.height / 2;
    }
  }

  getCursorPosition(e: any): { x: number; y: number } {
    const rect = this.Init.canvas.getBoundingClientRect();
    let clientX, clientY;

    if (e.touches && e.touches.length) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if (e.changedTouches && e.changedTouches.length) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * (this.Init.canvas.width / rect.width),
      y: (clientY - rect.top) * (this.Init.canvas.height / rect.height),
    };
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.slots.forEach((slot: any) => {
      const slotImg = document.getElementById(
        `${slot.content.id}`,
      ) as HTMLImageElement;
      const itemSize = this.Init.tileSize;
      const x = this.Init.tileSize * 1.75 - this.Init.tileSize / 2;
      const y = itemSize + this.Init.tileSize * 1.5;
      if (slot.id === '1') {
        slot.x = x;
        slot.y = y;
        slot.width = itemSize;
        slot.height = itemSize;
      }
      if (slot.id === '2') {
        slot.x = x;
        slot.y = y + itemSize;
        slot.width = itemSize;
        slot.height = itemSize;
      }
      if (slot.id === '6') {
        slot.x = x;
        slot.y = y + itemSize * 2;
        slot.width = itemSize;
        slot.height = itemSize;
      }
      if (slot.id === '5') {
        slot.x = x;
        slot.y = y + itemSize * 3;
        slot.width = itemSize;
        slot.height = itemSize;
      }
      if (slot.id === '3') {
        slot.x = x - itemSize;
        slot.y = y + itemSize;
        slot.width = itemSize;
        slot.height = itemSize;
      }
      if (slot.id === '4') {
        slot.x = x + itemSize;
        slot.y = y + itemSize * 2;
        slot.width = itemSize;
        slot.height = itemSize;
      }

      slotImg
        ? ctx.drawImage(slotImg, slot.x, slot.y, slot.width, slot.height)
        : null;
    });
    if (this.Init.dice.isChestOpen) {
      this.drawChest(ctx);
    }
  }

  getItemAt(x: number, y: number, items: any[]) {
    return items.find(
      (item) =>
        x > item.x &&
        x < item.x + item.width &&
        y > item.y &&
        y < item.y + item.height,
    );
  }

  init() {
    if (!this.isInit) {
      const itemSize = this.Init.tileSize;
      const x = this.Init.tileSize * 1.75 - this.Init.tileSize / 2;
      const y = itemSize + this.Init.tileSize * 1.5;
      const slotTop = {
        id: '1',
        x: x,
        y: y,
        width: itemSize,
        height: itemSize,
        content: WeaponsList.find((value) => value.id === 'sword'),
      };

      const slotDown = {
        id: '2',
        x: x,
        y: y + this.Init.tileSize,
        width: itemSize,
        height: itemSize,
        content: WeaponsList.find((value) => value.id === 'shield'),
      };

      const slotBottom = {
        id: '6',
        x: x,
        y: y + this.Init.tileSize * 2,
        width: itemSize,
        height: itemSize,
        content: WeaponsList.find((value) => value.id === 'sword'),
      };

      const slotUp = {
        id: '5',
        x: x,
        y: y + this.Init.tileSize * 3,
        width: itemSize,
        height: itemSize,
        content: WeaponsList.find((value) => value.id === 'sword'),
      };

      const slotLeft = {
        id: '3',
        x: x - this.Init.tileSize,
        y: y + this.Init.tileSize,
        width: itemSize,
        height: itemSize,
        content: WeaponsList.find((value) => value.id === 'shield'),
      };

      const slotRight = {
        id: '4',
        x: x + this.Init.tileSize,
        y: y + this.Init.tileSize,
        width: itemSize,
        height: itemSize,
        content: WeaponsList.find((value) => value.id === 'shield'),
      };

      this.slots.push(
        slotTop,
        slotDown,
        slotBottom,
        slotUp,
        slotLeft,
        slotRight,
      );

      this.slots.forEach((item) => {
        this.Init.dice.life += item.content.life;
      });

      this.isInit = true;
      this.isChestInitiated = true;
    }
  }

  update() {
    this.init();
    this.updateMenuButton();
    this.updateMenuScreen();
    this.chestItem = this.Init.chests.find(
      (chest: Chests) =>
        chest.tileX === this.Init.dice.tileX &&
        chest.tileY === this.Init.dice.tileY,
    );

    this.draw(this.Init.ctx);

    this.slots.forEach((slot) => {
      Object.values(this.Init.dice.faces).find((face: any) => {
        face.id === slot.id ? (face.content = slot.content) : null;
      });
    });
  }

  drawChest(ctx: CanvasRenderingContext2D) {
    this.chestMenu.width = this.Init.tileSize * 3;
    this.chestMenu.height = this.Init.tileSize * 3;
    this.chestMenu.x = (this.Init.canvas.width - this.chestMenu.width) / 2;
    this.chestMenu.y = (this.Init.canvas.height - this.chestMenu.height) / 2;

    ctx.save();
    ctx.fillStyle = 'hsl(228, 13%, 10%)';
    ctx.fillRect(
      this.chestMenu.x,
      this.chestMenu.y,
      this.chestMenu.width,
      this.chestMenu.height,
    );
    ctx.restore();

    const chestImg = document.getElementById(
      `${this.chestItem.content.id}`,
    ) as HTMLImageElement;

    ctx.drawImage(
      chestImg,
      this.chestItem.x,
      this.chestItem.y,
      this.chestItem.width,
      this.chestItem.height,
    );
  }

  updateMenuButton() {
    const rect = this.Init.canvas.getBoundingClientRect();

    const menuButton = document.getElementById(
      'menuButton',
    ) as HTMLButtonElement;
    if (menuButton) {
      const pixelRatio = window.devicePixelRatio || 1;

      menuButton.style.top = `${
        rect.top + this.Init.tileSize / 2 / pixelRatio
      }px`;
      menuButton.style.right = `${
        rect.left + this.Init.tileSize / 2 / pixelRatio
      }px`;
      menuButton.style.width = `${this.Init.tileSize / pixelRatio}px`;
      menuButton.style.height = `${this.Init.tileSize / pixelRatio}px`;
    }
  }

  updateMenuScreen() {
    const rect = this.Init.canvas.getBoundingClientRect();

    const menuScreen = document.getElementById('menuScreen') as HTMLDivElement;
    if (menuScreen) {
      menuScreen.style.top = `${rect.top}px`;
      menuScreen.style.left = `${rect.left}px`;
      menuScreen.style.width = `${rect.width}px`;
      menuScreen.style.height = `${rect.height}px`;
    }
  }
}

export default UiElements;
