import Init from './Init';
import { Story } from './objects/Story';

export class TheBatAndTheWorm extends Story {
  constructor(xAbsolute: number, yAbsolute: number, init: Init) {
    super(xAbsolute, yAbsolute, init);
    this.img = document.getElementById('bat-worm-img') as HTMLImageElement;
    this.id = 'bat-worm';
    this.text =
      '<p><b>La chauve souris et le vers de terre</b></br></br>Nael Varillon';
    this.audio = document.getElementById('bat-worm') as HTMLAudioElement;
    this.audioPlayed = false;
  }
}

export class Test extends Story {
  constructor(xAbsolute: number, yAbsolute: number, init: Init) {
    super(xAbsolute, yAbsolute, init);
    this.img = document.getElementById('bird-img') as HTMLImageElement;
    this.id = 'bird';
    this.text = '<p><b>TITRE</b></br></br>Auteur';
    this.audio = document.getElementById('testAudio') as HTMLAudioElement;
    this.audioPlayed = false;
  }
}
