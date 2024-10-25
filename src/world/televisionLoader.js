import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function TelevisionLoader(scene, renderer, camera) {
  const gltfloader = new GLTFLoader();
  gltfloader.load("/static/models/tv/scene.gltf", (gltf) => {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  });
}
