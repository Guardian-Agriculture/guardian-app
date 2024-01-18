import { atom } from 'recoil';
import { saveSessionData } from '../common/saveSessionData';

export const recoilZones = atom({
    key: 'recoilZones',
    default: [],
	effects: [saveSessionData('zones')],
});
