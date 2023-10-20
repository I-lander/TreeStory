import Init from "../Init.js";
import { Planet } from "./Planet.js";

export class DelementPlanet extends Planet {
  image: HTMLElement | null;
  id: string;
  text: string;

  constructor(x: any,y: any, init: Init) {
    super(x,y, init);
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
}