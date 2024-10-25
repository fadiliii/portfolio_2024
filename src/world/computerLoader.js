import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function ComputerLoader(scene, renderer, camera) {
  const gltfloader = new GLTFLoader();
  gltfloader.load("/static/models/pc/scene.gltf", (gltf) => {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  });
}
