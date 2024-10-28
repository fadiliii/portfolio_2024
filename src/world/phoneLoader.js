import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function PhoneLoader(scene, renderer, camera) {
  const gltfloader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    gltfloader.load(
      "/static/models/phone/scene.gltf",
      (gltf) => {
        scene.add(gltf.scene);
        const phoneModel = gltf.scene;
        phoneModel.scale.set(20, 20, 20);
        phoneModel.rotation.y = -Math.PI / 2;
        phoneModel.position.y = 1.1;
        phoneModel.visible = false;
        renderer.render(scene, camera);
        resolve(phoneModel);
      },
      undefined,
      reject
    );
  });
}
