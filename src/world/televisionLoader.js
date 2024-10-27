import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function TelevisionLoader(scene, renderer, camera) {
  const gltfloader = new GLTFLoader();
  gltfloader.load("/static/models/tv/scene2.gltf", (gltf) => {
    console.log(gltf);
    scene.add(gltf.scene);
    gltf.scene.rotation.y = Math.PI / 2;
    renderer.render(scene, camera);
  });
}
