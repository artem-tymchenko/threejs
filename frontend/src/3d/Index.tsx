import React, { useEffect, useRef } from 'react';
import { init3D } from './Init3D';

export function Index3D(): React.ReactElement {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        init3D(ref);
    });
    return <div ref={ref}/>;
}
