import { Camera, Object3D } from 'three';
import { DragControls } from 'three/examples/jsm/controls/DragControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let orbitControls: OrbitControls;

export function addDragControls(objects: Object3D[], camera: Camera, domElement: HTMLElement) {
    const dragControls = new DragControls(objects, camera, domElement)

    dragControls.addEventListener('dragstart', function (event) {
        orbitControls.enabled = false
        event.object.material.opacity = 0.33
    })
    dragControls.addEventListener('dragend', function (event) {
        orbitControls.enabled = true
        event.object.material.opacity = 1
    })
}

export function getOrbitControls(camera: Camera, domElement: HTMLElement): OrbitControls {
    orbitControls = new OrbitControls(camera, domElement)
    orbitControls.enableDamping = true

    return orbitControls;
}
