const COULEURS = [
  "#FF0000",
  "#FF7F00",
  "#FFFF00",
  "#00FF00",
  "#0000FF",
  "#4B0082",
  "#9400D3",
];

// Classe principale gérant le système
class SystemeStellaire {
  constructor(nombreParticules) {
    this.nombreParticules = nombreParticules;
    this.particules = [];
    this.vitesse = 2;
  }

  // Méthode d'initialisation appelée au début (ou pour reset)
  init() {
    this.particules = [];
    for (let i = 0; i < this.nombreParticules; i++) {
      this.particules.push(new Particule());
      // On randomise le Z initial pour éviter qu'elles partent toutes en même temps
      this.particules[i].z = random(width);
    }
  }

  // Mise à jour de la logique (ex: gestion de la vitesse avec la souris)
  update(interaction) {
    if (interaction) {
      this.vitesse = lerp(this.vitesse, 50, 0.05);
    } else {
      this.vitesse = lerp(this.vitesse, 2, 0.1);
    }
  }

  // Affichage du système complet
  display() {
    background(10, 15, 30, 50);

    push(); // Isole les transformations
    translate(width / 2, height / 2);

    for (let p of this.particules) {
      p.update(this.vitesse);
      p.display(this.vitesse);
    }

    pop();
  }
}

// Classe gérant une particule individuelle
class Particule {
  constructor() {
    this.reset();
  }

  // Réinitialise la particule quand elle dépasse la caméra
  reset() {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = width;
    this.couleur = random(COULEURS);
  }

  update(vitesseGlobale) {
    this.z -= vitesseGlobale;

    if (this.z < 1) {
      this.reset();
    }
  }

  display(vitesseGlobale) {
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    let r = map(this.z, 0, width, 12, 0);

    let px = map(this.x / (this.z + vitesseGlobale), 0, 1, 0, width);
    let py = map(this.y / (this.z + vitesseGlobale), 0, 1, 0, height);

    stroke(this.couleur);
    strokeWeight(r);
    line(px, py, sx, sy);
  }
}

// --- Fonctions p5.js ---

let systeme;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Instanciation et initialisation via la méthode init()
  systeme = new SystemeStellaire(1000);
  systeme.init();
}

function draw() {
  // On passe mouseIsPressed à l'update pour gérer l'interaction
  systeme.update(mouseIsPressed);
  systeme.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Optionnel : on pourrait appeler systeme.init() ici si on veut réinitialiser l'effet au redimensionnement
}
