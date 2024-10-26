import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function InitCamera(aspectRatio, scene, canvas) {
  const camera = new THREE.PerspectiveCamera(75, aspectRatio, 1, 1000);
  camera.position.set(10, 0, 0);
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  return { camera, controls };
}
