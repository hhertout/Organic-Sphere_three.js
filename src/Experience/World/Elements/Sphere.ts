import * as THREE from "three"
// @ts-ignore
import sphereVertexShader from "../../Shaders/Sphere/vertex.glsl"
// @ts-ignore
import sphereFragmentShader from "../../Shaders/Sphere/fragment.glsl"
import Experience from "../../Experience";

export default class Sphere {
    public geometry
    public material
    public experience
    public debug

    constructor(experience: Experience) {
        this.experience = experience
        this.debug = this.experience.debug
        this.geometry = new THREE.SphereGeometry(1, 50, 50)
        this.material = new THREE.ShaderMaterial({
            vertexShader: sphereVertexShader,
            fragmentShader: sphereFragmentShader,
            uniforms: {
                uElevation: {value: 0.25},
                uElevation2: {value: 0.15},
                uTime: {value: 0},
                uFrequency: {value: 0.001},
                uTimeReducer: {value: 0.001},
                uTimeReducer2 : {value: 0.003},
            }
        })

        this.debug.ui?.add(this.material.uniforms.uFrequency, 'value').min(0).max(0.1).step(0.001).name('uFrequency')
        this.debug.ui?.add(this.material.uniforms.uTimeReducer2, 'value').min(0).max(0.5).step(0.001).name('uTimeReducer2')
        this.debug.ui?.add(this.material.uniforms.uTimeReducer, 'value').min(0).max(0.005).step(0.0001).name('uTimeReducer')
        this.debug.ui?.add(this.material.uniforms.uElevation, 'value').min(0).max(2).step(0.1).name('uElevation')
        this.debug.ui?.add(this.material.uniforms.uElevation2, 'value').min(0).max(2).step(0.1).name('uElevation2')

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