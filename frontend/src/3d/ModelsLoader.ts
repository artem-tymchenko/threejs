import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// const loader = new FBXLoader();
const loader = new GLTFLoader();

export function loadModels(scene: THREE.Scene) {
    loader.load(
        process.env.PUBLIC_URL + '/3d/room.gltf',
        function (object) {
            // object.traverse(function (child) {
            //     if ((child as THREE.Mesh).isMesh) {
            //         console.log(child);
            //         if ((child as THREE.Mesh).material) {
            //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false;
            //         }
            //     }
            // })
            // object.scale.set(2, 2, 2);
            scene.add(object.scene);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    );
}
