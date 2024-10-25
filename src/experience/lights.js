import * as THREE from "three";

export default function InitLight(scene) {
  const AmbientLightlight = new THREE.AmbientLight("white");
  const DirectionalLight = new THREE.DirectionalLight("white");
  DirectionalLight.position.set(1, 1, 1);

  const directionalLightHelper = new THREE.DirectionalLightHelper(
    DirectionalLight,
    2
  );
  const ambientLightHelper = new THREE.AxesHelper(2);

  scene.add(
    AmbientLightlight,
    DirectionalLight,
    directionalLightHelper,
    ambientLightHelper
  );
}
