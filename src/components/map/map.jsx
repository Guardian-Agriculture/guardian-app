import { Suspense, useEffect, useCallback, useRef } from 'react';
import { useRecoilState } from 'recoil';

import MapboxGL from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { mapDrawStyles } from './map-draw-styles';

import {
    recoilMapCenter,
    recoilMapOperatorPosition,
    recoilMapZoom,
} from '../../state/map.state';

import 'mapbox-gl/dist/mapbox-gl.css';
import './map.scss';

MapboxGL.accessToken = 'pk.eyJ1IjoiZGVwdG9mamVmZmF5ZXIiLCJhIjoiY2w0ZDFpaGF3MDJyYzNqcDlrZzZsbWtxbiJ9.hoxdS073M8KEb67OMxmXrg';

const Map = () => {

    const map = useRef(null);
    const mapContainer = useRef(null); // initializes on div
    const mapDraw = useRef();
    const mapGeolocate = useRef();

    const [mapCenter, setMapCenter] = useRecoilState(recoilMapCenter);
    const [mapOperatorPosition, setMapOperatorPosition] = useRecoilState(recoilMapOperatorPosition);
    const [mapZoom, setMapZoom] = useRecoilState(recoilMapZoom);

    const onMapLoaded = useCallback(() => {

        // Fire the geolocation functionality
        mapGeolocate.current.trigger();

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

    useEffect(() => {
        
        map.current = new MapboxGL.Map({
            center: mapCenter,
            container: mapContainer.current,
            dragRotate: false, // Always face north ~Mike
            style: 'mapbox://styles/mapbox/satellite-streets-v11',
            touchZoomRotate: false,
            zoom: mapZoom
        });

        mapGeolocate.current = new MapboxGL.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });

        mapGeolocate.current.on('geolocate', ({coords}) => {
            if (coords) {
                const {
                    longitude,
                    latitude
                } = coords;

                // Returns the geolocated coordinates
                setMapOperatorPosition([longitude, latitude]);
            }
        });
        mapGeolocate.current.on('error', error => console.error(error.message));

        // Add geolocation controls to the map
        // They need to be present but not visible in order to work
        map.current.addControl(mapGeolocate.current);
        
        map.current.on('load', onMapLoaded);

        return () => map.current.remove();

    }, [map, mapZoom, mapCenter, onMapLoaded, setMapOperatorPosition]);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div ref={mapContainer} className='map' />
        </Suspense>
    );
}

export default Map;
