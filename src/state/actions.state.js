import { atom, selector } from 'recoil';
import { saveSessionData } from '../common/saveSessionData';
import { recoilDrawReference } from './map.state';

export const recoilActionsPanelOpen = atom({
    key: 'recoilActionsPanelOpen',
    default: false
});

export const recoilJobMode = atom({
    key: 'recoilJobMode',
    default: 'plan'
});

export const recoilZones = atom({
    key: 'recoilZones',
    default: [],
	effects: [saveSessionData('zones')],
});

export const recoilActiveItem = atom({
    key: 'recoilActiveItem',
    default: null
});

export const recoilAddZone = selector({
    key: 'recoilAddZone',
    get: ({get}) => {
        return get(recoilZones);
    },
    set: ({get, set}, data) => {
        const zones = get(recoilZones);
        
        set (
            recoilZones, 
            [...zones, data ? data : {
                boundaries: [],
                id: Date.now(),
                markers: [],
                value: 'Untitled Zone'
            }]
        );
    }
});

export const recoilAddBoundaryFeature = selector({
    key: 'recoilAddBoundaryFeature',
    get: ({get}) => {
        return get(recoilZones);
    },
    set: ({get, set}, data) => {
        const zones = get(recoilZones);
        const activeItem = get(recoilActiveItem);
        const creationDate = Date.now();
        const mapDraw = get(recoilDrawReference);
        const updatedBoundary = {
            id: creationDate,
            features: {...data, id: creationDate},
            type: 'sprayFence'
        };
        
        mapDraw.current.add(updatedBoundary.features);

        set (
            recoilActiveItem,
            creationDate
        );
        
        if (zones.length === 0) {
            // New zone
            set (
                recoilZones, 
                [...zones, {
                    boundaries: [updatedBoundary],
                    id: creationDate,
                    markers: [],
                    value: 'Untitled Zone'
                }]
            );
        } else {
            // Existing zone
            const updatedZones = zones.map((zone) => {
                const updatedZoneBoundaries = zone.boundaries.map((boundary) => {
                    if (boundary.id === activeItem) {
                        return updatedBoundary;
                    }
                    return boundary;
                })

                return {
                    ...zone,
                    boundaries: updatedZoneBoundaries
                }
            });
            
            set (
                recoilZones,
                updatedZones
            );
        }
    }
});

export const recoilUpdateBoundary = selector({
    key: 'recoilUpdateBoundary',
    get: ({get}) => {
        return get(recoilZones);
    },
    set: ({get, set}, updatedBoundary) => {
        const zones = get(recoilZones);

        // Existing zone
        const updatedZones = zones.map((zone) => {
            const updatedZoneBoundaries = zone.boundaries.map((boundary) => {
                if (boundary.id === updatedBoundary.id) {
                    return updatedBoundary;
                }
                return boundary;
            })

            return {
                ...zone,
                boundaries: updatedZoneBoundaries
            }
        });
        
        set (
            recoilZones,
            updatedZones
        );
    }
});

export const recoilDeleteZone = selector({
    key: 'recoilDeleteZone',
    get: ({get}) => {
        return get(recoilZones);
    },
    set: ({get, set}, id) => {
        const zones = get(recoilZones);
        const mapDraw = get(recoilDrawReference);
        const filteredZones = zones.filter(z => {
            z.boundaries.forEach((boundary) => {
                if ('features' in boundary) {
                    mapDraw.current.delete(boundary.features.id);
                }
            })
            z.markers.forEach((marker) => {
                // placeholder for when markers are added
            })

            return z.id !== id;
        });
        set(
            recoilZones,
            filteredZones
        );
    }
});

export const recoilDeleteZoneItemById = selector({
    key: 'recoilDeleteZoneItemById',
    get: ({get}) => {
        return get(recoilZones);
    },
    set: ({get, set}, id) => {
        const zones = get(recoilZones);
        const filteredZones = zones.map(z => {
            const filteredBoundaries = z.boundaries.filter(b => b.id !== id);
            const filteredMarkers = z.markers.filter(m => m.id !== id);
            return {
                ...z, 
                boundaries: filteredBoundaries,
                markers: filteredMarkers
            };
        });

        set(
            recoilZones,
            filteredZones
        );
    }
});
