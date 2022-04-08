import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const loader = new GLTFLoader();

export function loadModels(scene: THREE.Scene) {
    loader.load(
        process.env.PUBLIC_URL + '/3d/room.gltf',
        function (object) {
            console.log(object)
            object.scene.position.y = 1.6;
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
