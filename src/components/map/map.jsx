import { useEffect, useCallback, useRef } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import MapboxGL from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { mapDrawStyles } from './map-draw-styles';

import {
	recoilMapCenter,
	recoilMapOperatorPosition,
	recoilMapZoom,
	recoilDrawReference,
} from '../../state/map.state';
import {
	recoilZones,
	recoilDeleteZoneItemById,
	recoilAddBoundaryFeature,
	recoilActiveItem,
} from '../../state/actions.state';

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './map.scss';

MapboxGL.accessToken = 'pk.eyJ1IjoiZGVwdG9mamVmZmF5ZXIiLCJhIjoiY2w0ZDFpaGF3MDJyYzNqcDlrZzZsbWtxbiJ9.hoxdS073M8KEb67OMxmXrg';

const Map = () => {

	const map = useRef(null);
	const mapContainer = useRef(null); // initializes on div
	const mapDraw = useRef(null);
	const mapGeolocate = useRef(null);

	const setDrawReference = useSetRecoilState(recoilDrawReference);

	const [mapCenter, setMapCenter] = useRecoilState(recoilMapCenter);
	const [mapOperatorPosition, setMapOperatorPosition] = useRecoilState(recoilMapOperatorPosition);
	const [mapZoom, setMapZoom] = useRecoilState(recoilMapZoom);

	const zones = useRecoilValue(recoilZones);
	const addBoundaryFeature = useSetRecoilState(recoilAddBoundaryFeature);
	const deleteZoneItemById = useSetRecoilState(recoilDeleteZoneItemById);
	const [activeItem, setActiveItem] = useRecoilState(recoilActiveItem);

	const onMapLoaded = useCallback(() => {

		// Map listeners
		map.current.on('zoomend', () => {
            setMapZoom(map.current.getZoom());
            setMapCenter(map.current.getCenter());
        });

		map.current.on('moveend', () => {
            setMapCenter(map.current.getCenter());
        });

        map.current.on('touchend', () => {
            setMapCenter(map.current.getCenter());
        });

        map.current.on('dragend', () => {
            setMapCenter(map.current.getCenter());
        });

		mapDraw.current = new MapboxDraw({
			controls: {
				polygon: false,
				trash: true,
				point: false,
				line_string: false,
				combine_features: false,
				uncombine_features: false
			},
			displayControlsDefault: false,
			styles: mapDrawStyles,
			userProperties: true,
		});

		// Draw shapes on the map
		map.current.addControl(mapDraw.current);

		setDrawReference(mapDraw);

		// Draw listeners
		map.current.on('draw.create', (e) => {
			const features = {...e.features[0]};
			features.properties = { layerColor: '#057fb9' };
			/** 
			 * Mapbox draw won't replace the ID. To get around this
			 * the entire drawn object is deleted and recreated with 
			 * the correct ID within the addBoundaryFeature function
			*/
			mapDraw.current.delete(features.id);
			addBoundaryFeature(features);
		});

		map.current.on('draw.delete', (e) => {
			deleteZoneItemById(e.features[0].id);
		});

		map.current.on('draw.selectionchange', (e) => {
			console.log(map.current.getStyle());
			if (e.features.length > 0) {
				setActiveItem(e.features[0].id);
			}
		})

		// Trigger the geolocation functionality
		mapGeolocate.current.trigger();

		// Geolocate listeners
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

		// Render any session layers
		Object.keys(zones).forEach((zone) => {
			zones[zone].boundaries.forEach((boundary) => {
				if (boundary?.features) {
					mapDraw.current.add(boundary.features);
				}
			});
		});

	}, []);

	useEffect(() => {
        if (map.current && mapCenter.length) {
            map.current.flyTo({
                center: mapCenter,
                // zoom: mapZoom
            });
        }
    }, [mapCenter]);

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
			}
		});

		// Add geolocation controls to the map
		// They need to be present but not visible in order to work
		map.current.addControl(mapGeolocate.current);
		
		map.current.on('load', onMapLoaded);

		return () => map.current.remove();
	
		// Adding mapCenter and mapZoom to the dependancy array causes 
		// rerender bugs with geolocation
	}, [map, onMapLoaded]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div ref={mapContainer} className='app__map' />
	);
}

export default Map;
