// =============================
// Shared: Storage Helpers
// File: storage.js
// =============================

export function getStorageItem(key, fallback = null) {
	try {
		const storedValue = localStorage.getItem(key);

		if (storedValue === null) {
			return fallback;
		}

		return JSON.parse(storedValue);
	} catch (error) {
		console.error(`Erro ao ler "${key}" do localStorage:`, error);
		return fallback;
	}
}

export function setStorageItem(key, value) {
	try {
		localStorage.setItem(key, JSON.stringify(value));
		return true;
	} catch (error) {
		console.error(`Erro ao salvar "${key}" no localStorage:`, error);
		return false;
	}
}

export function removeStorageItem(key) {
	try {
		localStorage.removeItem(key);
		return true;
	} catch (error) {
		console.error(`Erro ao remover "${key}" do localStorage:`, error);
		return false;
	}
}

export function clearStorage() {
	try {
		localStorage.clear();
		return true;
	} catch (error) {
		console.error('Erro ao limpar localStorage:', error);
		return false;
	}
}

export function storageKey(namespace, key) {
	return `${namespace}:${key}`;
}
