import Init from '../Init';
import { Story } from './Story';

export class TheBatAndTheWorm extends Story {
  constructor(xAbsolute: number, yAbsolute: number, init: Init) {
    super(xAbsolute, yAbsolute, init);
    this.img = document.getElementById('bat-worm-img') as HTMLImageElement;
    this.id = 'bat-worm';
    this.text =
      '<p><b>La chauve souris et le vers de terre</b></br></br>Nael Varillon';
  }
}

export class Owl extends Story {
  constructor(xAbsolute: number, yAbsolute: number, init: Init) {
    super(xAbsolute, yAbsolute, init);
    this.img = document.getElementById('owl-img') as HTMLImageElement;
    this.id = 'owl';
    this.text = '<p><b>Lili et Gilbert</b></br></br>Morane Varillon';
  }
}

export class TheSnakeAndTheSpider extends Story {
  constructor(xAbsolute: number, yAbsolute: number, init: Init) {
    super(xAbsolute, yAbsolute, init);
    this.img = document.getElementById('theSnakeAndTheSpider-img') as HTMLImageElement;
    this.id = 'theSnakeAndTheSpider';
    this.text = "<p><b>Le serpent et l'araignée</b></br></br>Nael Varillon";
  }
}