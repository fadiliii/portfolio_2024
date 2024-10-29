import * as THREE from "three";

// Fonction pour générer le canevas de l'interface
export default function createWindows95Texture(width, height) {
  // Création du canevas
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Couleurs Windows 95
  const COLORS = {
    background: "#008080",
    taskbar: "#c0c0c0",
    buttonLight: "#ffffff",
    buttonDark: "#808080",
    buttonFace: "#c0c0c0",
    text: "#000000",
    windowBorder: "#000000",
  };

  // État de l'interface
  let state = {
    powerOn: true,
    startMenuOpen: false,
    icons: [
      { name: "Poste de travail", x: 20, y: 20, selected: false },
      { name: "Mes documents", x: 20, y: 100, selected: false },
      { name: "Corbeille", x: 20, y: 180, selected: false },
    ],
    windows: [],
    mouseX: 0,
    mouseY: 0,
  };

  // Classe pour les fenêtres
  class Window {
    constructor(title, x, y, width, height) {
      this.title = title;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }

    draw(ctx) {
      // Barre de titre
      ctx.fillStyle = COLORS.taskbar;
      ctx.fillRect(this.x, this.y, this.width, 20);

      // Corps de la fenêtre
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(this.x, this.y + 20, this.width, this.height - 20);

      // Bordures 3D
      draw3DRect(ctx, this.x, this.y, this.width, this.height);

      // Titre
      ctx.fillStyle = COLORS.text;
      ctx.font = "12px Arial";
      ctx.fillText(this.title, this.x + 5, this.y + 15);

      // Bouton fermer
      ctx.fillStyle = COLORS.buttonFace;
      ctx.fillRect(this.x + this.width - 20, this.y + 3, 16, 14);
      draw3DRect(ctx, this.x + this.width - 20, this.y + 3, 16, 14);
      ctx.fillStyle = COLORS.text;
      ctx.fillText("×", this.x + this.width - 15, this.y + 14);
    }
  }

  // Fonction utilitaire pour dessiner des rectangles 3D
  function draw3DRect(ctx, x, y, width, height) {
    // Bordure extérieure claire
    ctx.beginPath();
    ctx.strokeStyle = COLORS.buttonLight;
    ctx.moveTo(x, y + height);
    ctx.lineTo(x, y);
    ctx.lineTo(x + width, y);
    ctx.stroke();

    // Bordure extérieure sombre
    ctx.beginPath();
    ctx.strokeStyle = COLORS.buttonDark;
    ctx.moveTo(x + width, y);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.stroke();
  }

  // Dessiner le bureau
  function drawDesktop() {
    // Fond d'écran
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Icônes
    state.icons.forEach((icon) => {
      drawIcon(icon);
    });

    // Fenêtres
    state.windows.forEach((window) => {
      window.draw(ctx);
    });

    // Barre des tâches
    drawTaskbar();
  }

  // Dessiner une icône
  function drawIcon(icon) {
    const iconSize = 32;

    // Zone de l'icône
    if (icon.selected) {
      ctx.fillStyle = "#000080";
      ctx.fillRect(icon.x - 5, icon.y - 5, iconSize + 50, iconSize + 25);
    }

    // Icône (simulée par un rectangle)
    ctx.fillStyle = COLORS.buttonFace;
    ctx.fillRect(icon.x, icon.y, iconSize, iconSize);
    draw3DRect(ctx, icon.x, icon.y, iconSize, iconSize);

    // Texte de l'icône
    ctx.fillStyle = icon.selected ? "#ffffff" : COLORS.text;
    ctx.font = "12px Arial";
    ctx.fillText(icon.name, icon.x - 5, icon.y + iconSize + 15);
  }

  // Dessiner la barre des tâches
  function drawTaskbar() {
    ctx.fillStyle = COLORS.taskbar;
    ctx.fillRect(0, canvas.height - 30, canvas.width, 30);
    draw3DRect(ctx, 0, canvas.height - 30, canvas.width, 30);

    // Bouton Démarrer
    ctx.fillStyle = COLORS.buttonFace;
    ctx.fillRect(2, canvas.height - 28, 60, 26);
    draw3DRect(ctx, 2, canvas.height - 28, 60, 26);
    ctx.fillStyle = COLORS.text;
    ctx.font = "12px Arial";
    ctx.fillText("Démarrer", 8, canvas.height - 12);

    // Horloge
    const time = new Date().toLocaleTimeString().slice(0, -3);
    ctx.fillStyle = COLORS.text;
    ctx.fillText(time, canvas.width - 50, canvas.height - 12);
  }

  drawDesktop();

  // Retourner le canevas sous forme de texture
  return new THREE.CanvasTexture(canvas);
}
