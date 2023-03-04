import * as THREE from "three"
// @ts-ignore
import sphereVertexShader from "../../Shaders/Sphere/vertex.glsl"
// @ts-ignore
import sphereFragmentShader from "../../Shaders/Sphere/fragment.glsl"
import Experience from "../../Experience";
import {ColorRepresentation} from "three";

type DebugObject = {
    surfaceColor: ColorRepresentation | undefined
}

export default class Sphere {
    public geometry
    public material
    public experience
    public debug

    constructor(experience: Experience) {
        const debugObject: DebugObject = {
            surfaceColor: '#d71d43'
        }

        this.experience = experience
        this.debug = this.experience.debug
        this.geometry = new THREE.SphereGeometry(1, 512, 512)
        this.material = new THREE.ShaderMaterial({
            vertexShader: sphereVertexShader,
            fragmentShader: sphereFragmentShader,
            uniforms: {
                uTime: {value: 0},
                uTimeReducer: {value: 0.0005},
                uNoiseDensity: {value: 3.0},
                uNoiseStrength: {value: 0.1},
                uFrequency: {value: 3},
                uAmplitude: {value: 3.0},
                uColorOffset: {value: 0.1},
                uColorMultiplier: {value: 20.0},
                uSurfaceColor: {value: new THREE.Color(debugObject.surfaceColor)},
            }
        })

        this.debug.ui?.add(this.material.uniforms.uTimeReducer, 'value').min(0).max(0.001).step(0.00001).name('uTimeReducer')
        this.debug.ui?.add(this.material.uniforms.uNoiseDensity, 'value').min(0).max(20).step(0.1).name('uNoiseDensity')
        this.debug.ui?.add(this.material.uniforms.uNoiseStrength, 'value').min(0).max(1).step(0.01).name('uNoiseStrength')
        this.debug.ui?.add(this.material.uniforms.uFrequency, 'value').min(0).max(10).step(0.1).name('uFrequency')
        this.debug.ui?.add(this.material.uniforms.uAmplitude, 'value').min(0).max(20).step(0.1).name('uAmplitude')
        this.debug.ui?.add(this.material.uniforms.uColorOffset, 'value').min(0).max(1).step(0.1).name('uColorOffset')
        this.debug.ui?.add(this.material.uniforms.uColorMultiplier, 'value').min(0).max(40).step(1).name('uColorMultiplier')
        this.debug.ui?.addColor(debugObject, 'surfaceColor').name("depthColor")
            .onChange(() => this.material.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor))
    }

    getGeometry() {
        return this.geometry
    }

    getMaterial() {
        return this.material
    }

    update() {
        this.material.uniforms.uTime.value = this.experience.time.elapsed
    }
}