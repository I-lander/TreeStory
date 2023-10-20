import Init from '../Init';
import { getRandom } from '../Utils';
import Chests from './Chests';
import Monster, { monstersList } from './Monster';
import { WeaponsList } from './WeaponsList';

interface DungeonParams {
  numSkeleton: number;
  numSpider: number;
  numBat: number;
  numChests: number;
  numPikes: number;
  numVoids: number;
}

class TileMap {
  private static readonly WALL = 'wall';
  private static readonly EMPTY = '0';
  private static readonly SKELETON = 'skeleton';
  private static readonly SPIDER = 'spider';
  private static readonly BAT = 'bat';
  private static readonly CHEST = 'chest';
  private static readonly PIKES = 'spikes';
  private static readonly VOID = 'void';

  Init: Init;
  map: any[];
  tileSize: number;
  dice: boolean;
  monster: boolean;
  startX: number;
  startY: number;
  dungeonTile: HTMLImageElement;

  constructor(Init: Init) {
    this.Init = Init;
    this.map = this.Init.map;
    this.tileSize = 64;
    this.startX = 0;
    this.startY = 0;

    this.dungeonTile = document.getElementById('dungeon') as HTMLImageElement;

    this.dice = false;
    this.monster = false;
  }

  draw() {
    const ctx = this.Init.ctx as CanvasRenderingContext2D;

    this.startX =
      (this.Init.canvas.width - this.tileSize * this.Init.mapSize) / 2;
    this.startY =
      (this.Init.canvas.height - this.tileSize * this.Init.mapSize) / 2;

    for (let row = 0; row < this.Init.mapSize; row++) {
      for (let column = 0; column < this.Init.mapSize; column++) {
        let tile = this.map[row][column];
        const absoluteTileSize = 512;
        let dungeonTileX = 1;
        let dungeonTileY = 1;
        const mapSize = this.Init.mapSize;
        if ((row + column) % 2 === 0) {
          dungeonTileX = 1;
          dungeonTileY = 1;
        } else {
          dungeonTileX = 1;
          dungeonTileY = 2;
        }
        if (column === 0 && row === 0) {
          dungeonTileX = 0;
          dungeonTileY = 0;
        }
        if (column === mapSize - 1 && row === mapSize - 1) {
          dungeonTileX = 3;
          dungeonTileY = 3;
        }
        if (column === 0 && row === mapSize - 1) {
          dungeonTileX = 0;
          dungeonTileY = 3;
        }
        if (column === mapSize - 1 && row === 0) {
          dungeonTileX = 3;
          dungeonTileY = 0;
        }
        if (row === 0 && column != 0 && column != mapSize - 1) {
          dungeonTileX = 1;
          dungeonTileY = 0;
        }
        if (row === mapSize - 1 && column != 0 && column != mapSize - 1) {
          dungeonTileX = 1;
          dungeonTileY = 3;
        }

        if (column === 0 && row != 0 && row != mapSize - 1) {
          dungeonTileX = 0;
          dungeonTileY = 1;
        }
        if (column === mapSize - 1 && row != 0 && row != mapSize - 1) {
          dungeonTileX = 3;
          dungeonTileY = 1;
        }
        ctx.drawImage(
          this.dungeonTile,
          dungeonTileX * absoluteTileSize,
          dungeonTileY * absoluteTileSize,
          absoluteTileSize,
          absoluteTileSize,
          this.startX + column * this.tileSize,
          this.startY + row * this.tileSize,
          this.tileSize,
          this.tileSize,
        );
        if (tile === 'chest') {
          if (
            !this.Init.chests.find(
              (chest: Chests) => chest.tileX === column && chest.tileY === row,
            )
          ) {
            const chestObject = this.Init.chests.find(
              (chest: Chests) => chest.tileX === 0 && chest.tileY === 0,
            );
            if (chestObject) {
              const chestProto =
                WeaponsList[getRandom(0, WeaponsList.length - 1)];
              chestObject.tileX = column;
              chestObject.tileY = row;
              chestObject.content = { ...chestProto };
            }
          }
        }
        if (tile === 'spikes') {
          const spikesImg = document.getElementById(
            'spikes',
          ) as HTMLImageElement;
          ctx.drawImage(
            spikesImg,
            this.startX + column * this.tileSize,
            this.startY + row * this.tileSize,
            this.tileSize,
            this.tileSize,
          );
        }
        if (tile === 'void') {
          const voidImg = document.getElementById('void') as HTMLImageElement;
          ctx.drawImage(
            voidImg,
            this.startX + column * this.tileSize,
            this.startY + row * this.tileSize,
            this.tileSize,
            this.tileSize,
          );
        }
        if (tile === 'skeleton') {
          this.instantiateMonster('skeleton', column, row);
        }
        if (tile === 'spider') {
          this.instantiateMonster('spider', column, row);
        }
        if (tile === 'bat') {
          this.instantiateMonster('bat', column, row);
        }
      }
    }
  }

  update() {
    this.tileSize = Math.floor(this.Init.canvas.height / this.Init.mapSize);
    this.Init.tileSize = this.tileSize;

    this.draw();
  }
  getPosition(x: number, y: number) {
    const rect = this.Init.canvas.getBoundingClientRect();

    x = (x - rect.left) * (this.Init.canvas.width / rect.width);
    y = (y - rect.top) * (this.Init.canvas.height / rect.height);

    let position = { x: -1, y: -1 };

    for (let row = 0; row < this.Init.mapSize; row++) {
      for (let column = 0; column < this.Init.mapSize; column++) {
        const tileStartX = this.startX + column * this.tileSize;
        const tileStartY = this.startY + row * this.tileSize;
        const tileEndX = tileStartX + this.tileSize;
        const tileEndY = tileStartY + this.tileSize;

        if (
          x >= tileStartX &&
          x < tileEndX &&
          y >= tileStartY &&
          y < tileEndY
        ) {
          position.x = column;
          position.y = row;
          break;
        }
      }
    }

    return position;
  }

  generateDungeonTilemap(params: DungeonParams) {
    const { numSkeleton, numSpider, numBat, numChests, numPikes, numVoids } =
      params;

    for (let i = 0; i < this.Init.mapSize; i++) {
      this.map[0][i] = TileMap.WALL;
      this.map[this.Init.mapSize - 1][i] = TileMap.WALL;
      this.map[i][0] = TileMap.WALL;
      this.map[i][this.Init.mapSize - 1] = TileMap.WALL;
    }

    const tilesToPlace = Array(numSkeleton)
      .fill(TileMap.SKELETON)
      .concat(Array(numSpider).fill(TileMap.SPIDER))
      .concat(Array(numBat).fill(TileMap.BAT))
      .concat(Array(numChests).fill(TileMap.CHEST))
      .concat(Array(numPikes).fill(TileMap.PIKES))
      .concat(Array(numVoids).fill(TileMap.VOID));

    tilesToPlace.sort(() => Math.random() - 0.5);

    for (const tile of tilesToPlace) {
      let placed = false;
      while (!placed) {
        const i = Math.floor(Math.random() * (this.Init.mapSize - 2)) + 1;
        const j = Math.floor(Math.random() * (this.Init.mapSize - 2)) + 1;

        if (i !== this.Init.dice.tileY && j !== this.Init.dice.tileX) {
          if (this.map[i][j] === TileMap.EMPTY) {
            this.map[i][j] = tile;
            placed = true;
          }
        }
      }
    }
  }

  instantiateMonster(monsterType: string, column: number, row: number) {
    if (
      !this.Init.monsters.find(
        (monster: Monster) => monster.tileX === column && monster.tileY === row,
      )
    ) {
      const monsterObject = this.Init.monsters.find(
        (monster: Monster) =>
          monster.life <= 0 &&
          !monster.isDead &&
          monster.tileX === 0 &&
          monster.tileY === 0,
      );
      if (monsterObject) {
        const monsterProto = monstersList.find(
          (value) => value.id === monsterType,
        );
        monsterObject.tileX = column;
        monsterObject.tileY = row;
        monsterObject.initMonster(monsterProto);
      }
    }
  }
}

export default TileMap;
