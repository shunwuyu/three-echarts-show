import * as kokomi from "kokomi.js";
import * as THREE from "three";

import World from "./World/World";

import Debug from "./Debug";

import Postprocessing from "./Postprocessing";

import { resources } from "./resources";

export default class Experience extends kokomi.Base {
  params;
  controls: kokomi.CameraControls;
  world: World;
  debug: Debug;
  am: kokomi.AssetManager;
  post: Postprocessing;
  constructor(sel = "#sketch") {
    super(sel, {
      autoAdaptMobile: true,
    });

    (window as any).experience = this;

    this.params = {
      speed: 0,
      cameraPos: {
        x: 0,
        y: 0.8,
        z: -11,
      },
      isCameraMoving: false,
      lightAlpha: 0,
      lightIntensity: 0,
      envIntensity: 0,
      envWeight: 0,
      reflectIntensity: 0,
      lightOpacity: 1,
      floorLerpColor: 0,
      carBodyEnvIntensity: 1,
      cameraShakeIntensity: 0,
      bloomLuminanceSmoothing: 1.6,
      bloomIntensity: 1,
      speedUpOpacity: 0,
      cameraFov: 33.4,
      furinaLerpColor: 0,
      isRushing: false,
      disableInteract: false,
      isFurina: window.location.hash === "#furina",
    };

    this.debug = new Debug();
    // 电影胶卷的色调映射效果，能给图像带来一种类似电影的色彩效果
    this.renderer.toneMapping = THREE.CineonToneMapping;

    let resourcesToLoad = resources;
    if (!this.params.isFurina) {
      resourcesToLoad = resourcesToLoad.filter(
        (item) => !["driving", "decal"].includes(item.name)
      );
    }
    console.log(resourcesToLoad);

    this.am = new kokomi.AssetManager(this, resourcesToLoad, {
      useMeshoptDecoder: true,
    });

    const camera = this.camera as THREE.PerspectiveCamera;
    camera.fov = this.params.cameraFov;
    // 用于在更改相机的投影参数（如视野、近裁剪面、远裁剪面等）后，更新相机的投影矩阵
    camera.updateProjectionMatrix();
    const cameraPos = new THREE.Vector3(
      this.params.cameraPos.x,
      this.params.cameraPos.y,
      this.params.cameraPos.z
    );
    camera.position.copy(cameraPos);
    const lookAt = new THREE.Vector3(0, 0.8, 0);
    camera.lookAt(lookAt);

    const controls = new kokomi.CameraControls(this);
    controls.controls.setTarget(lookAt.x, lookAt.y, lookAt.z);
    this.controls = controls;

    this.world = new World(this);

    this.post = new Postprocessing(this);

    // this.update(() => {
    //   const target = new THREE.Vector3();
    //   console.log(JSON.stringify(controls.controls.getPosition(target)));
    // });

    this.update(() => {
      if (this.params.isCameraMoving) {
        this.controls.controls.enabled = false;
        this.controls.controls.setPosition(
          this.params.cameraPos.x,
          this.params.cameraPos.y,
          this.params.cameraPos.z
        );
      } else {
        this.controls.controls.enabled = true;
      }
    });
  }
}
