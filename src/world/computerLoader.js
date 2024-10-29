// ComputerLoader.js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import createWindows95Texture from "../utils/windows-95";

export async function ComputerLoader(scene, renderer, camera) {
  return new Promise((resolve, reject) => {
    const gltfloader = new GLTFLoader();
    const texture = createWindows95Texture(800, 600);

    gltfloader.load(
      "/static/models/pc/scene2.glb",
      (gltf) => {
        const computerModel = gltf.scene;

        computerModel.scale.set(0.03, 0.03, 0.03);
        computerModel.rotation.y = Math.PI / 2;
        computerModel.position.y = -1.56;
        computerModel.position.x = 1.14;
        computerModel.visible = true;

        computerModel.traverse((child) => {
          if (child.isMesh && child.name === "pc_screen") {
            const material = new THREE.MeshBasicMaterial({ map: texture });
            child.material = material;
          }
        });

        texture.repeat.set(1, 1);
        texture.offset.set(2.064, 1.336);
        texture.needsUpdate = true;

        scene.add(computerModel);
        renderer.render(scene, camera);

        // Résolution du modèle et retour de la texture pour le GUI
        resolve({ computerModel, texture });
      },
      undefined,
      (error) => {
        console.error("Erreur de chargement du modèle:", error);
        reject(error);
      }
    );
  });
}
