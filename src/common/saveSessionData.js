export const saveSessionData = (key) => ({setSelf, onSet}) => {
	const savedValue = sessionStorage.getItem(key);
	if (savedValue != null) {
		setSelf(JSON.parse(savedValue));
	}
  
	onSet((newValue, _, isReset) => {
		isReset
			? sessionStorage.removeItem(key)
			: sessionStorage.setItem(key, JSON.stringify(newValue));
	});
};
