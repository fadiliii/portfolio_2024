import * as THREE from "three";

export default function createIOSInterface() {
  // Créer le canvas
  const canvas = document.createElement("canvas");
  canvas.width = 390; // iPhone 14/15 width
  canvas.height = 844; // iPhone 14/15 height
  const ctx = canvas.getContext("2d");

  // Palette de couleurs iOS
  const colors = {
    background: "#F2F2F7",
    iconBackground: "rgba(255,255,255,0.8)",
    primaryBlue: "#007AFF",
    systemGray: "#8E8E93",
    darkText: "#000000",
    lightText: "#FFFFFF",
  };

  // Fonctions utilitaires
  function drawRoundedRect(x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fill();
  }

  function drawGlassomorphicIcon(x, y, size, color) {
    // Fond principal
    ctx.fillStyle = color;
    drawRoundedRect(x, y, size, size, size * 0.2);

    // Effet de verre
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.rect(x, y, size, size / 2);
    ctx.clip();
    drawRoundedRect(x, y, size, size, size * 0.2);
    ctx.restore();
  }

  function drawTopStatusBar() {
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.fillRect(0, 0, canvas.width, 44);

    // Simuler l'encoche
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.roundRect(canvas.width / 2 - 60, 0, 120, 34, [0, 0, 20, 20]);
    ctx.fill();

    // Icônes de status
    ctx.fillStyle = colors.systemGray;
    ctx.font = "12px San Francisco, Arial, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText("9:41", canvas.width - 10, 30);
  }

  function drawSocialIcons() {
    const socialNetworks = [
      { name: "Twitter", color: "#1DA1F2", x: 30, y: 200 },
      { name: "Instagram", color: "#E1306C", x: 140, y: 200 },
      { name: "Discord", color: "#5865F2", x: 250, y: 200 },
      { name: "LinkedIn", color: "#0077B5", x: 360, y: 200 },
    ];

    ctx.shadowColor = "rgba(0,0,0,0.1)";
    ctx.shadowBlur = 10;
    ctx.shadowOffsetY = 5;

    socialNetworks.forEach((network) => {
      drawGlassomorphicIcon(network.x - 50, network.y, 100, network.color);

      // Texte sous l'icône
      ctx.fillStyle = colors.darkText;
      ctx.font = "16px San Francisco, Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(network.name, network.x, network.y + 130);
    });

    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;
  }

  function drawBottomNavigation() {
    // Fond de la barre de navigation
    ctx.fillStyle = "rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.roundRect(10, canvas.height - 90, canvas.width - 20, 80, 40);
    ctx.fill();

    const apps = [
      { name: "Messages", color: "#34C759", x: 70 },
      { name: "Spotify", color: "#007AFF", x: 190 },
      { name: "Mail", color: "#FF3B30", x: 310 },
    ];

    apps.forEach((app, index) => {
      // Icône d'application
      ctx.fillStyle = app.color;
      ctx.beginPath();
      ctx.arc(app.x, canvas.height - 50, 30, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  function render() {
    // Fond
    ctx.fillStyle = colors.background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner les éléments
    drawTopStatusBar();
    drawSocialIcons();
    drawBottomNavigation();

    return canvas;
  }

  // Rendre le canvas immédiatement visible
  function init() {
    render();
    canvas.style.boxShadow = "0 0 20px rgba(0,0,0,0.2)";
    canvas.style.borderRadius = "40px";
    canvas.style.transform = "scale(0.9)";
  }
  init();
  return new THREE.CanvasTexture(canvas);
}

// Initialiser l'interface iOS
