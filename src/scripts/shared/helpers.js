// =============================
// Shared: Generic Helpers
// File: helpers.js
// =============================

export function generateId(prefix = 'id') {
	if (globalThis.crypto?.randomUUID) {
		return `${prefix}-${globalThis.crypto.randomUUID()}`;
	}

	return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function sanitizeText(value) {
	if (typeof value !== 'string') {
		return '';
	}

	return value.trim();
}

export function escapeHTML(value) {
	return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
}

export function debounce(callback, delay = 300) {
	let timeoutId;

	return (...args) => {
		window.clearTimeout(timeoutId);

		timeoutId = window.setTimeout(() => {
			callback(...args);
		}, delay);
	};
}

export function clamp(value, min, max) {
	return Math.min(Math.max(value, min), max);
}

export function normalizeSearch(value) {
	return sanitizeText(value)
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
}
