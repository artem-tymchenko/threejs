import * as THREE from 'three';
import React from 'react';
import { getOrbitControls } from './Controls';
import { loadModels } from './ModelsLoader';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const sceneMeshes: THREE.Object3D[] = [];
let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let orbitControls: OrbitControls;

export function init3D(ref: React.MutableRefObject<HTMLDivElement | null>): void {
    if (!ref.current) {
        return;
    }

    scene = getScene();
    camera = getCamera();

    renderer = getRenderer(ref.current);
    ref.current.appendChild(VRButton.createButton(renderer));

    orbitControls = getOrbitControls(camera, renderer.domElement);
    loadModels(scene);
}

function getScene(): THREE.Scene {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xAAAAAA );
    scene.add(new THREE.AxesHelper(5));

    const light = new THREE.AmbientLight();
    scene.add(light);

    return scene;
}

// function getCeil(): THREE.Mesh {
//     const geometry = new THREE.PlaneGeometry(10, 10);
//     const material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
//     material.side = THREE.BackSide;
//     const plane = new THREE.Mesh(geometry, material);
//     plane.rotateX(Math.PI / 2);
//     plane.name = 'Ceil';
//
//     return plane;
// }

function getCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    return camera;
}

function getRenderer(div: HTMLDivElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
        logarithmicDepthBuffer: true,
    })
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth, window.innerHeight)
    div.appendChild(renderer.domElement)
    renderer.xr.enabled = true;

    renderer.setAnimationLoop(animationLoop);

    return renderer;
}

function render() {
    renderer.render(scene, camera)
}

function animationLoop() {
    renderer.render( scene, camera );
    orbitControls.update();
}

function animate() {
    requestAnimationFrame(animate)

    // orbitControls.update()

    render();

    // stats.update()
}
