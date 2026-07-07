// =============================
// Shared: Formatters
// File: formatters.js
// =============================

export function formatDate(dateValue, locale = 'pt-BR') {
	if (!dateValue) {
		return 'data desconhecida';
	}

	const date = new Date(dateValue);

	if (Number.isNaN(date.getTime())) {
		return 'data inválida';
	}

	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric'
	}).format(date);
}

export function formatDateTime(dateValue, locale = 'pt-BR') {
	if (!dateValue) {
		return 'data desconhecida';
	}

	const date = new Date(dateValue);

	if (Number.isNaN(date.getTime())) {
		return 'data inválida';
	}

	return new Intl.DateTimeFormat(locale, {
		day: '2-digit',
		month: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit'
	}).format(date);
}

export function pluralize(count, singular, plural) {
	return count === 1 ? singular : plural;
}

export function formatCounter(count, singular, plural) {
	return `${count} ${pluralize(count, singular, plural)}`;
}

export function capitalize(value) {
	if (typeof value !== 'string' || !value.trim()) {
		return '';
	}

	const normalizedValue = value.trim();

	return normalizedValue.charAt(0).toUpperCase() + normalizedValue.slice(1);
}
