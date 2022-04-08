import * as THREE from 'three';
import React from 'react';
import { getOrbitControls } from './Controls';
import { loadModels } from './ModelsLoader';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Object3D } from 'three';
import { getBabyBed } from './BabyBed';
import { pick } from './Actions';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let orbitControls: OrbitControls;
// let controller: THREE.Group;
// const dolly = new THREE.Object3D();
// const dummyCam = new THREE.Object3D();
// let pressed = false;
// const clock = new THREE.Clock();

export function init3D(ref: React.MutableRefObject<HTMLDivElement | null>): void {
    if (!ref.current) {
        return;
    }

    scene = getScene();
    camera = getCamera();

    // const ceil = getCeil();
    // scene.add(ceil);

    renderer = getRenderer(ref.current);
    ref.current.appendChild(VRButton.createButton(renderer));

    orbitControls = getOrbitControls(camera, renderer.domElement);
    // Look at the same point that VR starts
    orbitControls.target = new THREE.Vector3(0, 1.6, -1);

    loadModels(scene);
    const babyBed = getBabyBed();
    babyBed.position.set(-0.8, 0.5, 1.3);
    babyBed.rotation.set(0, 0.8, 0);

    scene.add(babyBed);

    pick(renderer, camera, [babyBed]);
}

function getScene(): THREE.Scene {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xAAAAAA );
    // scene.add(new THREE.AxesHelper(5));

    const light = new THREE.AmbientLight();
    scene.add(light);

    return scene;
}

function getCeil(): THREE.Mesh {
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff, side: THREE.DoubleSide} );
    material.side = THREE.BackSide;
    const plane = new THREE.Mesh(geometry, material);
    plane.rotateX(Math.PI / 2);
    plane.name = 'Ceil';

    return plane;
}

function getCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.set(0, 1.6, 0);

    return camera;
}

function getRenderer(div: HTMLDivElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
        logarithmicDepthBuffer: true,
    })
    renderer.physicallyCorrectLights = true;
    renderer.shadowMap.enabled = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setSize(window.innerWidth, window.innerHeight);
    div.appendChild(renderer.domElement);
    setupVR(renderer);

    renderer.setAnimationLoop(animationLoop);

    return renderer;
}

function setupVR(renderer: THREE.WebGLRenderer) {
    renderer.xr.enabled = true;

    // controller = renderer.xr.getController(0);
    //
    // controller.addEventListener( 'selectstart', onSelectStart );
    // controller.addEventListener( 'selectend', onSelectEnd );
    // controller.addEventListener( 'connected', ( event ) => {
    //
    //     const mesh = buildController(event.data);
    //     if (mesh) {
    //         mesh.scale.z = 0;
    //         scene.add(mesh);
    //     }
    // } );
    // controller.addEventListener( 'disconnected', function () {
    //
    //     this.remove( this.children[ 0 ] );
    //     self.controller = null;
    //     self.controllerGrip = null;
    //
    // } );

    // dolly.position.z = 0;
    // dolly.add(camera);
    // scene.add(dolly);
    // camera.add(dummyCam);
}

// function onSelectStart() {
//     pressed = true;
// }
//
// function onSelectEnd() {
//     pressed = false;
// }

// function buildController(data: any): THREE.Mesh | THREE.Line | undefined {
//     let geometry, material;
//
//     switch ( data.targetRayMode ) {
//
//         case 'tracked-pointer':
//
//             geometry = new THREE.BufferGeometry();
//             geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0, 0, 0, - 1 ], 3 ) );
//             geometry.setAttribute( 'color', new THREE.Float32BufferAttribute( [ 0.5, 0.5, 0.5, 0, 0, 0 ], 3 ) );
//
//             material = new THREE.LineBasicMaterial( { vertexColors: true, blending: THREE.AdditiveBlending } );
//
//             return new THREE.Line( geometry, material );
//
//         case 'gaze':
//
//             geometry = new THREE.RingBufferGeometry( 0.02, 0.04, 32 ).translate( 0, 0, - 1 );
//             material = new THREE.MeshBasicMaterial( { opacity: 0.5, transparent: true } );
//             return new THREE.Mesh( geometry, material );
//
//     }
// }
//
// const speed = 0.2;
//
// function handleController(dt: number) {
//     if (pressed) {
//         const quaternion = dolly.quaternion.clone();
//
//         let newQuaternion = new THREE.Quaternion();
//         let quaternion2 = new THREE.Quaternion();
//         quaternion2 = dummyCam.getWorldQuaternion(newQuaternion);
//         console.log(quaternion2, newQuaternion);
//         newQuaternion = new THREE.Quaternion();
//
//         dolly.quaternion.copy(newQuaternion);
//         dolly.translateZ(-dt * speed);
//         dolly.position.y = 0;
//
//         // dolly.translateX(speed * dt * camera.quaternion.x);
//         // dolly.translateY(speed * dt * camera.quaternion.y);
//         // dolly.translateZ(speed * dt * camera.quaternion.z);
//         dolly.quaternion.copy(quaternion);
//     }
// }

function animationLoop() {
    renderer.render( scene, camera );
    orbitControls.update();
    TWEEN.update();

    // if (controller) {
    //     handleController(clock.getDelta());
    // }
}
