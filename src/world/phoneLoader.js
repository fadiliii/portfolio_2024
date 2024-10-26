import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function PhoneLoader(scene, renderer, camera) {
  const gltfloader = new GLTFLoader();
  gltfloader.load("/static/models/phone/scene.gltf", (gltf) => {
    scene.add(gltf.scene);
    const phoneModel = gltf.scene;

    phoneModel.scale.set(20, 20, 20);
    phoneModel.rotation.y = Math.PI / 2;
    phoneModel.position.y = 1.1;
    renderer.render(scene, camera);
  });
}
