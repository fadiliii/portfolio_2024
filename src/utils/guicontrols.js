import GUI from "lil-gui";

export default function SetupGui(
  camera,
  computerModel,
  TVModel,
  phoneModel,
  videoTexture,
  Wintexture,
  texture
) {
  const gui = new GUI();

  const settings = {
    isVisiblePC: true,
    isVisibleTV: true,
    isVisiblePhone: true,
    offsetX: 0,
    offsetY: 0,
    repeatUniform: 1,
    rotation: 0,
  };

  // Contrôles de la caméra
  gui.add(camera.position, "x", -10, 10).name("Camera X");
  gui.add(camera.position, "y", -10, 10).name("Camera Y");
  gui.add(camera.position, "z", -10, 10).name("Camera Z");

  // Contrôles pour le modèle PC
  gui.add(computerModel.position, "x", -10, 10).name("Position PC x");
  gui.add(computerModel.position, "y", -10, 10).name("Position PC y");
  gui.add(computerModel.position, "z", -10, 10).name("Position PC z");
  gui
    .add(settings, "isVisiblePC")
    .name("Voir PC")
    .onChange((value) => {
      computerModel.visible = value;
    });

  // Contrôles pour le modèle TV
  gui.add(TVModel.position, "x", -10, 10).name("Position TV x");
  gui.add(TVModel.position, "y", -10, 10).name("Position TV y");
  gui.add(TVModel.position, "z", -10, 10).name("Position TV z");
  gui
    .add(settings, "isVisibleTV")
    .name("Voir TV")
    .onChange((value) => {
      TVModel.visible = value;
    });

  // Contrôles pour le modèle téléphone
  gui.add(phoneModel.position, "x", -10, 10).name("Position Phone x");
  gui.add(phoneModel.position, "y", -10, 10).name("Position Phone y");
  gui.add(phoneModel.position, "z", -10, 10).name("Position Phone z");
  gui
    .add(settings, "isVisiblePhone")
    .name("Voir Phone")
    .onChange((value) => {
      phoneModel.visible = value;
    });

  videoTexture.center.set(0.5, 0.5);

  //contrôles pour le repeat uniforme et le décalage
  gui
    .add(settings, "repeatUniform", 0.1, 10)
    .name("Zoom")
    .onChange((value) => {
      videoTexture.repeat.set(value, value);
    });

  gui
    .add(settings, "offsetX", -1, 5)
    .name("Offset X")
    .onChange((value) => {
      videoTexture.offset.x = value;
    });
  gui
    .add(settings, "offsetY", -1, 5)
    .name("Offset Y")
    .onChange((value) => {
      videoTexture.offset.y = value;
    });

  gui
    .add(settings, "rotation", -Math.PI, Math.PI)
    .name("Rotation")
    .onChange((value) => {
      videoTexture.rotation = value;
    });

  gui
    .add(settings, "repeatUniform", 0.1, 100)
    .name("Zoom")
    .onChange((value) => {
      Wintexture.repeat.set(value, value);
    });

  gui
    .add(settings, "offsetX", -5, 100)
    .name("Offset X")
    .onChange((value) => {
      Wintexture.offset.x = value;
    });
  gui
    .add(settings, "offsetY", -5, 100)
    .name("Offset Y")
    .onChange((value) => {
      Wintexture.offset.y = value;
    });

  gui
    .add(settings, "rotation", -Math.PI, Math.PI)
    .name("Rotation")
    .onChange((value) => {
      Wintexture.rotation = value;
    });

  gui
    .add(settings, "repeatUniform", 0.1, 100)
    .name("Zoom")
    .onChange((value) => {
      texture.repeat.set(value, value);
    });

  gui
    .add(settings, "offsetX", -5, 100)
    .name("Offset X")
    .onChange((value) => {
      texture.offset.x = value;
    });
  gui
    .add(settings, "offsetY", -5, 100)
    .name("Offset Y")
    .onChange((value) => {
      texture.offset.y = value;
    });

  gui
    .add(settings, "rotation", -Math.PI, Math.PI)
    .name("Rotation")
    .onChange((value) => {
      texture.rotation = value;
    });
}
