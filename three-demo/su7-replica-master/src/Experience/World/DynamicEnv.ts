import * as kokomi from "kokomi.js";
import * as THREE from "three";
import gsap from "gsap";

import type Experience from "../Experience";

import dynamicEnvVertexShader from "../Shaders/DynamicEnv/vert.glsl";
import dynamicEnvFragmentShader from "../Shaders/DynamicEnv/frag.glsl";

export interface DynamicEnvConfig {
  // THREE.Texture 是 Three.js 中的一个类，用于表示从图像文件加载的纹理
  envmap1: THREE.Texture;
  envmap2: THREE.Texture;
}
// 创建复杂的动画序列
const t1 = gsap.timeline();
// kokomi.Component 是 Kokomi.js 框架中的一个核心类，
// 用于创建可重用和模块化的三维场景组件，简化复杂的 Three.js 项目开发
export default class DynamicEnv extends kokomi.Component {
  // declare 是 TypeScript 中的关键字，用于声明在其他地方已经定义的变量、
  // 类型或模块，使其可以在当前文件中使用，而不重复定义。
  declare base: Experience;
  fbo: kokomi.FBO;
  // 自定义着色器（shader）效果的材质，通过 GLSL 语言编写的顶点和片元着色器代码，可以实现高度定制的图形渲染效果。
  material: THREE.ShaderMaterial;
  quad: kokomi.FullScreenQuad;
  constructor(base: Experience, config: Partial<DynamicEnvConfig> = {}) {
    super(base);

    const { envmap1, envmap2 } = config;

    const envData = envmap1?.source.data;

    const fbo = new kokomi.FBO(this.base, {
      width: envData.width,
      height: envData.height,
    });
    this.fbo = fbo;

    this.envmap.mapping = THREE.CubeUVReflectionMapping;

    const material = new THREE.ShaderMaterial({
      vertexShader: dynamicEnvVertexShader,
      fragmentShader: dynamicEnvFragmentShader,
      uniforms: {
        uEnvmap1: {
          value: envmap1,
        },
        uEnvmap2: {
          value: envmap2,
        },
        uWeight: {
          value: 0,
        },
        uIntensity: {
          value: 1,
        },
      },
    });
    this.material = material;

    const quad = new kokomi.FullScreenQuad(material);
    this.quad = quad;
  }
  update() {
    this.base.renderer.setRenderTarget(this.fbo.rt);
    this.quad.render(this.base.renderer);
    this.base.renderer.setRenderTarget(null);
  }
  get envmap() {
    return this.fbo.rt.texture;
  }
  setWeight(value: number) {
    this.material.uniforms.uWeight.value = value;
  }
  setIntensity(value: number) {
    this.material.uniforms.uIntensity.value = value;
  }
  lerpWeight(value: number, duration: number) {
    // t1.timeScale(0.2);
    t1.to(this.material.uniforms.uWeight, {
      value,
      duration,
      ease: "power2.out",
    });
  }
}
