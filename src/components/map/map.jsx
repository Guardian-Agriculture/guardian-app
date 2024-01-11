import { Suspense, useLayoutEffect, useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';

import MapboxGL from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { mapDrawStyles } from './map-draw-styles';

import {
    recoilMapCenter,
    recoilMapZoom,
} from '../../state/map.state';

import 'mapbox-gl/dist/mapbox-gl.css';
import './map.scss';

MapboxGL.accessToken = 'pk.eyJ1IjoiZGVwdG9mamVmZmF5ZXIiLCJhIjoiY2w0ZDFpaGF3MDJyYzNqcDlrZzZsbWtxbiJ9.hoxdS073M8KEb67OMxmXrg';

const Map = () => {

    const map = useRef(null);
    const mapContainer = useRef(null); // initializes on div
    const mapDraw = useRef();

    // The async return of the navigation promise is causing a warning in the console
    const [mapCenter, setMapCenter] = useRecoilState(recoilMapCenter);
    const [mapZoom, setMapZoom] = useRecoilState(recoilMapZoom);

    const onMapLoaded = useCallback(() => {
        mapDraw.current = new MapboxDraw({
            displayControlsDefault: false,
            userProperties: true,
            controls: {
                polygon: false,
                trash: true,
                point: false,
                line_string: false,
                combine_features: false,
                uncombine_features: false
            },
            styles: mapDrawStyles
        });

        // Draw shapes on the map
        map.current.addControl(mapDraw.current);
    }, []);

    useLayoutEffect(() => {
        
        map.current = new MapboxGL.Map({
            center: mapCenter,
            container: mapContainer.current,
            dragRotate: false, // Always face north ~Mike
            style: 'mapbox://styles/mapbox/satellite-streets-v11',
            touchZoomRotate: false,
            zoom: mapZoom
        });

        map.current.on('load', onMapLoaded);

        return () => map.current.remove();

    }, [map, mapZoom, mapCenter, onMapLoaded]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div ref={mapContainer} className='map' />
        </Suspense>
    );
}

export default Map;
