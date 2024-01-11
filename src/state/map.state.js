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

export const usersLocation = selector({
    key: 'usersLocation',
    get: async () => {
        const { coords: {
            longitude,
            latitude,
        }} = await new Promise((success, error) => {
            navigator.geolocation.getCurrentPosition(success, error);
        }).catch(({message}) => {
            console.warn(`${message} centering map on [0, 0]`);
            return {coords: {latitude: 0, longitude: 0}}
        });

        return [longitude, latitude];
    }
});

export const recoilMapCenter = atom({
    key: 'recoilMapCenter',
    default: selector({
        key: 'getUsersLocation',
        get: ({get}) => get(usersLocation)
    }),
    effects: [saveSessionData('map-center')],
});

export const recoilMapZoom = atom({
    key: 'recoilMapZoom',
    default: 18,
    effects: [saveSessionData('map-zoom')],
});
