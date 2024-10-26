import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default async function ComputerLoader(scene, renderer, camera) {
  return new Promise((resolve, reject) => {
    const gltfloader = new GLTFLoader();

    gltfloader.load(
      "/static/models/pc/scene.gltf",
      (gltf) => {
        scene.add(gltf.scene);
        const computerModel = gltf.scene;

        computerModel.scale.set(0.03, 0.03, 0.03);
        computerModel.rotation.y = Math.PI / 2;
        computerModel.position.y = -1.56;
        computerModel.position.x = 1.14;

        resolve(computerModel);

        renderer.render(scene, camera);
      },
      undefined,
      (error) => {
        console.error(
          "Une erreur s'est produite lors du chargement du modèle:",
          error
        );
        reject(error);
      }
    );
  });
}
