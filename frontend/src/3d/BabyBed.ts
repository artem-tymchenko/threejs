import { ConeGeometry, Mesh, MeshNormalMaterial } from 'three';

export function getBabyBed(): Mesh {
    const geometry = new ConeGeometry(0.65, 0.6, 4);
    const material = new MeshNormalMaterial();
    const bed = new Mesh(geometry, material);
    bed.name = 'BabyBed';

    return bed;
}
