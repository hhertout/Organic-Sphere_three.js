import Experience from "../Experience";
import Environment from "./Environment";
import Sphere from "./Elements/Sphere";
import * as THREE from "three"

export default class World {
    protected experience
    public scene
    public environment?: Environment
    public sphere

    constructor(experience: Experience) {
        this.experience = experience
        this.scene = this.experience.scene

        // Elements
        this.sphere = new Sphere(this.experience)
        const sphereMesh = new THREE.Mesh(this.sphere.getGeometry(), this.sphere.getMaterial())

        this.scene.add(sphereMesh)
    }

    update() {
        this.sphere.update()
    }
}