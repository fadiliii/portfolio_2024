import GUI from "lil-gui";

export default function SetupGui(camera, computerModel) {
  const gui = new GUI();

  gui.add(camera.position, "x", -10, 10).name("Camera X");
  gui.add(camera.position, "y", -10, 10).name("Camera Y");
  gui.add(camera.position, "z", -10, 10).name("Camera Z");

  gui.add(computerModel.position, "x", -10, 10).name("Position TV x");
  gui.add(computerModel.position, "y", -10, 10).name("Position TV y");
  gui.add(computerModel.position, "z", -10, 10).name("Position TV z");
}
