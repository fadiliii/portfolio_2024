import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import createIOSInterface from "../utils/ios";

export function PhoneLoader(scene, renderer, camera) {
  const gltfloader = new GLTFLoader();
  const texture = createIOSInterface();
  return new Promise((resolve, reject) => {
    gltfloader.load(
      "/static/models/phone/scene2.glb",
      (gltf) => {
        scene.add(gltf.scene);
        const phoneModel = gltf.scene;
        phoneModel.scale.set(20, 20, 20);
        phoneModel.rotation.y = -Math.PI / 2;
        phoneModel.position.y = 1.1;

        phoneModel.traverse((child) => {
          if (child.isMesh && child.name === "phone_screen") {
            const material = new THREE.MeshBasicMaterial({ map: texture });
            child.material = material;
          }
        });
        texture.repeat.set(2, 2);
        texture.offset.set(2, 1);
        texture.needsUpdate = true;

        renderer.render(scene, camera);
        resolve(phoneModel);
      },
      undefined,
      reject
    );
  });
}
