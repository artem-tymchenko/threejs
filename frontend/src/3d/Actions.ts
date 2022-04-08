import { Camera, Mesh, Object3D, Raycaster, Renderer } from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min';

const raycaster = new Raycaster();

export function pick(renderer: Renderer, camera: Camera, objects: Object3D[]): Mesh | undefined {
    renderer.domElement.addEventListener('click', (event) => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = -(event.clientY / window.innerHeight) * 2 + 1;
        console.log(x, y);
        raycaster.setFromCamera({ x, y }, camera);
        const intersects = raycaster.intersectObjects(objects, true);

        if (intersects.length) {
            animate(intersects[0].object);
        }
    });

    return;
}

function animate(object: Object3D) {
    new TWEEN.Tween(object.rotation).to({z: 0.2, x: 0.2}, 1000).easing(TWEEN.Easing.Sinusoidal.InOut).onComplete(() => {
        new TWEEN.Tween(object.rotation).to({z: -0.15, x: -0.15}, 1000).easing(TWEEN.Easing.Sinusoidal.InOut).onComplete(() => {
            new TWEEN.Tween(object.rotation).to({z: 0, x: 0}, 1000).easing(TWEEN.Easing.Sinusoidal.InOut).start()
        }).start();
    }).start();
}


