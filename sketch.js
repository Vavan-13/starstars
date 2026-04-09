const CONFIG = {
  systeme: {
    nombreParticules: 1000,
    couleurs: [
      "#FF0000",
      "#FF7F00",
      "#FFFF00",
      "#00FF00",
      "#0000FF",
      "#4B0082",
      "#9400D3",
    ],
    couleurFond: [10, 15, 30, 50],
  },
  physique: {
    vitesseNormale: 2,
    vitesseAccelere: 50,
    inertieAcceleration: 0.05,
    inertieDeceleration: 0.1,
  },
  rendu: {
    tailleMaxParticule: 12,
  },
};

class Particule {
  #couleur;
  #pz; // Position Z précédente pour dessiner la traînée

  constructor() {
    this.reset(true);
  }

  reset(premierLancement = false) {
    this.x = random(-width, width);
    this.y = random(-height, height);
    this.z = premierLancement ? random(width) : width; // Répartit la profondeur au départ

    this.#pz = this.z;
    this.#couleur = random(CONFIG.systeme.couleurs);
  }

  update(vitesseGlobale) {
    this.#pz = this.z;
    this.z -= vitesseGlobale;

    if (this.z < 1) {
      this.reset();
    }
  }

  display() {
    let sx = map(this.x / this.z, 0, 1, 0, width);
    let sy = map(this.y / this.z, 0, 1, 0, height);
    let rayon = map(this.z, 0, width, CONFIG.rendu.tailleMaxParticule, 0);
    let px = map(this.x / this.#pz, 0, 1, 0, width);
    let py = map(this.y / this.#pz, 0, 1, 0, height);

    stroke(this.#couleur);
    strokeWeight(rayon);
    line(px, py, sx, sy);
  }
}

class SystemeStellaire {
  #particules;
  #vitesseActuelle;

  constructor() {
    this.#particules = [];
    this.#vitesseActuelle = CONFIG.physique.vitesseNormale;
  }

  init() {
    this.#particules = [];
    for (let i = 0; i < CONFIG.systeme.nombreParticules; i++) {
      this.#particules.push(new Particule());
    }
  }

  update(estEnInteraction) {
    const cible = estEnInteraction
      ? CONFIG.physique.vitesseAccelere
      : CONFIG.physique.vitesseNormale;

    const lerpForce = estEnInteraction
      ? CONFIG.physique.inertieAcceleration
      : CONFIG.physique.inertieDeceleration;

    this.#vitesseActuelle = lerp(this.#vitesseActuelle, cible, lerpForce);
    for (let particule of this.#particules) {
      particule.update(this.#vitesseActuelle);
    }
  }

  display() {
    background(...CONFIG.systeme.couleurFond);

    push();
    translate(width / 2, height / 2);

    for (let particule of this.#particules) {
      particule.display();
    }

    pop();
  }
}

let systeme;

function setup() {
  createCanvas(windowWidth, windowHeight);
  systeme = new SystemeStellaire();
  systeme.init();
}

function draw() {
  systeme.update(mouseIsPressed);
  systeme.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  // Décommente si on veux recréer les particules au redimensionnement
  // systeme.init();
}
