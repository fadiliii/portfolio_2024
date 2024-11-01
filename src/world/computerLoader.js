// ComputerLoader.js
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import createWindows95Texture from "../utils/windows-95";

export async function ComputerLoader(scene, renderer, camera) {
  return new Promise((resolve, reject) => {
    const gltfloader = new GLTFLoader();
    const Wintexture = createWindows95Texture(
      84.9448561668396,
      63.90901794154992
    );

    gltfloader.load(
      "/static/models/pc/scene2.glb",
      (gltf) => {
        const computerModel = gltf.scene;

        computerModel.rotation.y = Math.PI / 2;
        computerModel.position.y = -1.56;
        computerModel.position.x = 1.14;
        computerModel.visible = false;

        computerModel.traverse((child) => {
          if (child.isMesh && child.name === "pc_screen") {
            const material = new THREE.MeshBasicMaterial({ map: Wintexture });
            child.material = material;
          }
        });
        const meshdim = computerModel.getObjectByName("pc_screen");

        const boundingBox = new THREE.Box3().setFromObject(meshdim);
        const dimensions = new THREE.Vector3();
        boundingBox.getSize(dimensions);
        console.log("dimension:", dimensions);

        Wintexture.repeat.set(1, 1);
        Wintexture.offset.set(1, 1);
        Wintexture.needsUpdate = true;

        scene.add(computerModel);
        renderer.render(scene, camera);

        // Résolution du modèle et retour de la texture pour le GUI
        resolve({ computerModel, Wintexture });
      },
      undefined,
      (error) => {
        console.error("Erreur de chargement du modèle:", error);
        reject(error);
      }
    );
  });
}
