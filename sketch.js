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
    fond: [10, 15, 30, 50],
  },
  physique: {
    vitesseBase: 2,
    vitesseBoost: 50,
    acceleration: 0.05,
    deceleration: 0.1,
  },
  rendu: {
    tailleMax: 120, // taille des cercles
  },
};

class Particule {
  #couleur;
  #pz;

  constructor() {
    this.reset(true);
  }

  reset(isInitial = false) {
    // Spawn large pour couvrir les mouvements du point de fuite
    this.x = random(-width * 1.5, width * 1.5);
    this.y = random(-height * 1.5, height * 1.5);
    this.z = isInitial ? random(width) : width;
    this.#pz = this.z;
    this.#couleur = random(CONFIG.systeme.couleurs);
  }

  update(vitesse) {
    this.#pz = this.z;
    this.z -= vitesse;
    if (this.z < 1) this.reset();
  }

  draw() {
    // Projection 3D vers 2D
    const sx = map(this.x / this.z, 0, 1, 0, width);
    const sy = map(this.y / this.z, 0, 1, 0, height);
    const px = map(this.x / this.#pz, 0, 1, 0, width);
    const py = map(this.y / this.#pz, 0, 1, 0, height);

    const r = map(this.z, 0, width, CONFIG.rendu.tailleMax, 0);

    stroke(this.#couleur);
    strokeWeight(r);
    line(px, py, sx, sy);
  }
}

class MoteurStellaire {
  #particules = [];
  #vitesse = CONFIG.physique.vitesseBase;
  #origine;

  constructor(nb) {
    this.#origine = createVector(width / 2, height / 2);
    for (let i = 0; i < nb; i++) this.#particules.push(new Particule());
  }

  update(isPressed) {
    // Mise à jour de l'origine uniquement au clic
    if (isPressed) this.#origine.set(mouseX, mouseY);

    const cible = isPressed
      ? CONFIG.physique.vitesseBoost
      : CONFIG.physique.vitesseBase;
    const force = isPressed
      ? CONFIG.physique.acceleration
      : CONFIG.physique.deceleration;

    this.#vitesse = lerp(this.#vitesse, cible, force);
    this.#particules.forEach((p) => p.update(this.#vitesse));
  }

  render() {
    background(...CONFIG.systeme.fond);
    push();
    translate(this.#origine.x, this.#origine.y);
    this.#particules.forEach((p) => p.draw());
    pop();
  }
}

class Aura {
  draw(isActive) {
    const x = mouseX || width / 2;
    const y = mouseY || height / 2;

    push();
    translate(x, y);
    noStroke();

    if (isActive) {
      fill(100, 200, 255, 40);
      circle(0, 0, 100);
      fill(255, 150);
      circle(0, 0, 10);
    } else {
      const pulse = sin(frameCount * 0.1) * 5;
      fill(255, 20);
      circle(0, 0, 30 + pulse);
      fill(255, 100);
      circle(0, 0, 4);
    }
    pop();
  }
}

let moteur, interfaceUtilisateur;

function setup() {
  createCanvas(windowWidth, windowHeight);
  moteur = new MoteurStellaire(CONFIG.systeme.nombreParticules);
  interfaceUtilisateur = new Aura();
  noCursor();
}

function draw() {
  moteur.update(mouseIsPressed);
  moteur.render();
  interfaceUtilisateur.draw(mouseIsPressed);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
