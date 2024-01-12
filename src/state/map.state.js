import { atom, selector } from 'recoil';

const saveSessionData = (key) => ({setSelf, onSet}) => {
    const savedValue = sessionStorage.getItem(key)
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }
  
    onSet((newValue, _, isReset) => {
      isReset
        ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
};

export const recoilMapCenter = atom({
    key: 'recoilMapCenter',
    default: [0,0],
    effects: [saveSessionData('map-center')],
});

export const recoilMapZoom = atom({
    key: 'recoilMapZoom',
    default: 18,
    effects: [saveSessionData('map-zoom')],
});
