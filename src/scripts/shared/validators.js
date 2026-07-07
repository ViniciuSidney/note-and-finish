// =============================
// Shared: Validators
// File: validators.js
// =============================

export function isEmpty(value) {
	return value === null || value === undefined || String(value).trim() === '';
}

export function hasMinLength(value, minLength) {
	return String(value || '').trim().length >= minLength;
}

export function hasMaxLength(value, maxLength) {
	return String(value || '').trim().length <= maxLength;
}

export function isValidEmail(value) {
	if (isEmpty(value)) {
		return false;
	}

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	return emailPattern.test(String(value).trim());
}

export function isOneOf(value, allowedValues = []) {
	return allowedValues.includes(value);
}

export function validateRequired(value, message = 'Este campo é obrigatório.') {
	if (isEmpty(value)) {
		return message;
	}

	return '';
}

export function validateMaxLength(value, maxLength, message) {
	if (!hasMaxLength(value, maxLength)) {
		return message || `Este campo deve ter no máximo ${maxLength} caracteres.`;
	}

	return '';
}

export function validateMinLength(value, minLength, message) {
	if (!hasMinLength(value, minLength)) {
		return message || `Este campo deve ter pelo menos ${minLength} caracteres.`;
	}

	return '';
}
