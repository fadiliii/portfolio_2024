import animate from "../utils/animations.js";
import Resize from "../utils/responsive.js";
import InitSize from "../utils/sizes.js";
import ComputerLoader from "../world/computerLoader.js";
import PhoneLoader from "../world/phoneLoader.js";
import TelevisionLoader from "../world/televisionLoader.js";
import InitCamera from "./camera.js";
import InitLight from "./lights.js";
import InitRender from "./renderer.js";
import InitScene from "./scene";

export default function startExeperience() {
  const { aspectRatio, sizes } = InitSize();
  const scene = InitScene();
  const { renderer, canvas } = InitRender(sizes);
  const { camera, controls } = InitCamera(aspectRatio, scene, canvas);

  InitLight(scene);
  TelevisionLoader(scene, renderer, camera);
  ComputerLoader(scene, renderer, camera);
  PhoneLoader(scene, renderer, camera);

  Resize(sizes, camera, renderer, scene);
  animate(controls, renderer, scene, camera);
}
