# 🚀 Moteur Stellaire "Starstars" - p5.js

Bienvenue sur le dépôt de mon Moteur Stellaire ! Ce projet est une expérience interactive développée avec p5.js. Voici le journal de bord de sa création.

**Voir la visualisation en direct :** [Moteur Stellaire "Starstars"](https://vavan-13.github.io/starstars/)

---

## 📖 Journal de Création : Les Étapes de Développement

### Prompt 1 : Amorçage (Conformément à la fiche)

> "Voici mes spécifications. Ne génère pas le code final. Aide-moi à coder étape par étape en m'expliquant chaque fonction p5.js dont j'ai besoin. Commence par la section Canvas."

**Réponse IA :** L'IA m'a expliqué l'utilisation de `createCanvas(windowWidth, windowHeight)` pour occuper tout l'écran. Elle m'a suggéré d'utiliser `background(10, 15, 30, 50)` pour obtenir un effet de traînée lumineuse grâce à l'opacité réduite du fond.

### Prompt 2 : Interaction basique (Accélération centrale)

> "Je veux que le dispositif réagisse au clic quand je clique la vitesse des particules doit augmenter vers le centre de l'écran. Comment on ftait ?"

**Réponse IA :** L'IA m'a introduit à la fonction `mouseIsPressed` et à la variable `lerp()` pour lisser le passage entre la vitesse de base et le boost. À cette étape, l'accélération était fixe au centre (`width/2`, `height/2`) et le curseur de la souris était encore visible.

### Prompt 3 : Immersion et Personnalisation (Suppression du curseur)

> "Je trouve que le curseur Windows casse l'immersion artistique. Je veux le supprimer et le remplacer par une 'aura' lumineuse qui pulse quand je ne fais rien, et qui change quand je clique."

**Réponse IA :** Elle m'a montré la fonction `noCursor()` à placer dans le `setup()`. Pour l'aura, elle m'a conseillé de créer une classe dédiée (`Aura`) utilisant `sin(frameCount)` pour créer un effet de pulsation organique et `circle()` pour dessiner le retour visuel.

### Prompt 4 : Dynamisme du point de fuite (Évolution finale)

> "Actuellement, tout converge vers le centre. Je veux que le point de fuite se déplace là où je clique, pour que l'utilisateur ait l'impression de diriger le vaisseau vers une direction précise."

**Réponse IA :** C'est ici que nous avons intégré `translate(mouseX, mouseY)` mais uniquement au moment du clic. L'IA m'a aidé à structurer le MoteurStellaire pour qu'il stocke une origine (un vecteur) qui se met à jour dynamiquement.

### Prompt 5 : Optimisation et Propreté (Refactorisation)

> "Le code devient complexe avec 1000 particules. Peux-tu m'aider à tout organiser avec un objet CONFIG et des classes propres utilisant des propriétés privées (#) ?"

**Réponse IA :** Nous avons finalisé le code en utilisant des classes JS modernes. L'IA m'a expliqué comment `forEach` permet de mettre à jour toutes les particules efficacement et comment la projection 3D (`this.x / this.z`) crée cet effet de profondeur sans utiliser de moteur 3D complexe.

---

## 🔍 Traçabilité et Auto-critique (Consigne 4)

- **Parties réalisées avec l'IA :** Calcul mathématique de la projection perspective, gestion de l'interpolation (`lerp`) pour la sensation physique de poussée, et structure des classes.
- **Prompts utilisés :** Voir la liste ci-dessus.
- **Modifications personnelles :** _ J'ai ajusté le "spawn" des particules à `width _ 1.5` pour éviter les zones vides quand on déplace le point de fuite brusquement sur les bords.
  - J'ai aussi modifié la palette pour qu'elle rappelle les couleurs "Starstars" de mon idée initiale.

**Où commence l'interaction ?** Ici, elle commence dès le mouvement de l'aura (curseur) et se transforme en une expérience de "pilotage" lors du clic, créant cette illusion d'authorship recherchée.
