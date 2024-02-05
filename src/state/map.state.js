import { atom } from 'recoil';
import { saveSessionData } from '../common/saveSessionData';

export const recoilMapCenter = atom({
	key: 'recoilMapCenter',
	default: [0,0],
	effects: [saveSessionData('map-center')],
});

export const recoilMapOperatorPosition = atom({
	key: 'recoilMapOperatorPosition',
	default: null,
	effects: [saveSessionData('operator-position')],
});

export const recoilMapZoom = atom({
	key: 'recoilMapZoom',
	default: 18,
	effects: [saveSessionData('map-zoom')],
});

export const recoilMapDrawMode = atom({
	key: 'recoilMapDrawMode',
	default: 'simple_select'
});

export const recoilDrawReference = atom({
	key: 'recoilDrawReference',
	default: null
})
