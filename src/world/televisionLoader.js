import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export function TelevisionLoader(scene, renderer, camera) {
  const gltfLoader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    gltfLoader.load(
      "/static/models/tv/scene3.glb",
      (gltf) => {
        const TVModel = gltf.scene;
        TVModel.rotation.y = Math.PI / 2;

        TVModel.traverse((child) => {
          if (child.isMesh) {
            console.log("Mesh Name: ", child.name); // Affiche le nom du mesh
          }
        });

        // Trouver le maillage de l'écran
        const screenMesh = TVModel.getObjectByName("tv_screen");

        // Créer l'élément vidéo
        const video = document.createElement("video");
        video.src = "/static/videos/Me at the zoo.mp4";
        video.muted = true;
        video.loop = true;
        video.play();

        // Créer la texture vidéo
        const videoTexture = new THREE.VideoTexture(video);
        videoTexture.minFilter = THREE.LinearFilter;
        videoTexture.magFilter = THREE.LinearFilter;
        videoTexture.format = THREE.RGBAFormat;
        videoTexture.center.set(0.5, 0.5);

        if (screenMesh) {
          // Récupérer les dimensions de l'écran
          const box = new THREE.Box3().setFromObject(screenMesh);
          const screenWidth = box.max.x - box.min.x;
          const screenHeight = box.max.y - box.min.y;

          // Calculer le rapport d'aspect de l'écran
          const screenAspect = screenWidth / screenHeight;

          // Créer un nouveau matériau pour l'écran
          const screenMaterial = new THREE.MeshBasicMaterial({
            map: videoTexture,
          });

          // Appliquer le matériau à l'écran
          screenMesh.material = screenMaterial;

          // Ajuster la répétition de la texture vidéo
          videoTexture.repeat.set(2, 2);
          videoTexture.offset.set(2, 2);

          // Ajuste les dimensions de la texture vidéo pour éviter le zoom
          videoTexture.needsUpdate = true;
        }
        scene.add(TVModel);
        renderer.render(scene, camera);
        resolve({ TVModel, videoTexture });
      },
      undefined,
      reject
    );
  });
}
