// =============================
// Feature: Example / Items
// File: example.model.js
// =============================

import {generateId, sanitizeText, normalizeSearch} from '../../shared/helpers.js';

import {validateRequired, validateMaxLength, isOneOf} from '../../shared/validators.js';

export const ITEM_STATUS = {
	ACTIVE: 'active',
	PENDING: 'pending',
	COMPLETED: 'completed'
};

export const ITEM_STATUS_LABELS = {
	[ITEM_STATUS.ACTIVE]: 'Ativo',
	[ITEM_STATUS.PENDING]: 'Pendente',
	[ITEM_STATUS.COMPLETED]: 'Concluído'
};

export const ITEM_STATUS_BADGE_CLASSES = {
	[ITEM_STATUS.ACTIVE]: 'badge-success',
	[ITEM_STATUS.PENDING]: 'badge-warning',
	[ITEM_STATUS.COMPLETED]: 'badge-primary'
};

export const ITEM_CATEGORIES = {
	INTERFACE: 'interface',
	DATA: 'dados',
	STUDY: 'estudos',
	PRODUCTIVITY: 'produtividade',
	OTHER: 'outros'
};

export const ITEM_CATEGORY_LABELS = {
	[ITEM_CATEGORIES.INTERFACE]: 'Interface',
	[ITEM_CATEGORIES.DATA]: 'Dados',
	[ITEM_CATEGORIES.STUDY]: 'Estudos',
	[ITEM_CATEGORIES.PRODUCTIVITY]: 'Produtividade',
	[ITEM_CATEGORIES.OTHER]: 'Outros'
};

export function createItem(data = {}) {
	const now = new Date().toISOString();

	return {
		id: data.id || generateId('item'),
		name: sanitizeText(data.name),
		description: sanitizeText(data.description),
		category: normalizeCategory(data.category),
		status: normalizeStatus(data.status),
		createdAt: data.createdAt || now,
		updatedAt: now
	};
}

export function updateItem(currentItem, newData = {}) {
	return {
		...currentItem,
		name: sanitizeText(newData.name),
		description: sanitizeText(newData.description),
		category: normalizeCategory(newData.category),
		status: normalizeStatus(newData.status),
		updatedAt: new Date().toISOString()
	};
}

export function validateItem(data = {}) {
	const errors = {};

	const name = sanitizeText(data.name);
	const description = sanitizeText(data.description);

	const requiredNameError = validateRequired(name, 'Informe o nome do item.');
	const maxNameError = validateMaxLength(name, 80, 'O nome deve ter no máximo 80 caracteres.');
	const maxDescriptionError = validateMaxLength(description, 240, 'A descrição deve ter no máximo 240 caracteres.');

	if (requiredNameError) {
		errors.name = requiredNameError;
	} else if (maxNameError) {
		errors.name = maxNameError;
	}

	if (maxDescriptionError) {
		errors.description = maxDescriptionError;
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
}

export function normalizeStatus(status) {
	const allowedStatuses = Object.values(ITEM_STATUS);

	if (isOneOf(status, allowedStatuses)) {
		return status;
	}

	return ITEM_STATUS.ACTIVE;
}

export function normalizeCategory(category) {
	const allowedCategories = Object.values(ITEM_CATEGORIES);

	if (isOneOf(category, allowedCategories)) {
		return category;
	}

	return ITEM_CATEGORIES.OTHER;
}

export function getStatusLabel(status) {
	return ITEM_STATUS_LABELS[status] || ITEM_STATUS_LABELS[ITEM_STATUS.ACTIVE];
}

export function getCategoryLabel(category) {
	return ITEM_CATEGORY_LABELS[category] || ITEM_CATEGORY_LABELS[ITEM_CATEGORIES.OTHER];
}

export function getStatusBadgeClass(status) {
	return ITEM_STATUS_BADGE_CLASSES[status] || 'badge-outline';
}

export function itemMatchesSearch(item, searchTerm) {
	const normalizedSearch = normalizeSearch(searchTerm);

	if (!normalizedSearch) {
		return true;
	}

	const searchableContent = [item.name, item.description, getCategoryLabel(item.category), getStatusLabel(item.status)].map(normalizeSearch).join(' ');

	return searchableContent.includes(normalizedSearch);
}

export function itemMatchesStatus(item, statusFilter) {
	if (!statusFilter || statusFilter === 'all') {
		return true;
	}

	return item.status === statusFilter;
}

export function sortItemsByRecent(items = []) {
	return [...items].sort((a, b) => {
		return new Date(b.updatedAt) - new Date(a.updatedAt);
	});
}

export function countItemsByStatus(items = []) {
	return {
		total: items.length,
		active: items.filter((item) => item.status === ITEM_STATUS.ACTIVE).length,
		pending: items.filter((item) => item.status === ITEM_STATUS.PENDING).length,
		completed: items.filter((item) => item.status === ITEM_STATUS.COMPLETED).length
	};
}
