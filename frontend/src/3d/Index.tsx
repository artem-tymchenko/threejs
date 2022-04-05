import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'
import { init3D } from './Init3D';

const scene = new THREE.Scene()
const sceneMeshes: THREE.Object3D[] = []

scene.background = new THREE.Color( 0xAAAAAA );
scene.add(new THREE.AxesHelper(5))

const light = new THREE.SpotLight();
light.position.set(0, 5, 5)
scene.add(light);

export function Index3D(): React.ReactElement {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        init3D(ref);
    });
    return <div ref={ref}/>;
}
