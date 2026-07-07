// =============================
// Feature: Example / Items
// File: example.service.js
// =============================

import {createItem, updateItem, itemMatchesSearch, itemMatchesStatus, sortItemsByRecent, countItemsByStatus} from './example.model.js';

import {getStorageItem, setStorageItem, storageKey} from '../../shared/storage.js';

const STORAGE_NAMESPACE = 'modelo-projeto';
const STORAGE_KEY = storageKey(STORAGE_NAMESPACE, 'example-items');

export function getItems() {
	return getStorageItem(STORAGE_KEY, []);
}

export function saveItems(items = []) {
	return setStorageItem(STORAGE_KEY, items);
}

export function addItem(data) {
	const items = getItems();
	const newItem = createItem(data);

	const updatedItems = [newItem, ...items];

	saveItems(updatedItems);

	return newItem;
}

export function editItem(itemId, newData) {
	const items = getItems();

	let editedItem = null;

	const updatedItems = items.map((item) => {
		if (item.id !== itemId) {
			return item;
		}

		editedItem = updateItem(item, newData);

		return editedItem;
	});

	saveItems(updatedItems);

	return editedItem;
}

export function deleteItem(itemId) {
	const items = getItems();

	const updatedItems = items.filter((item) => item.id !== itemId);

	saveItems(updatedItems);
}

export function findItemById(itemId) {
	const items = getItems();

	return items.find((item) => item.id === itemId) || null;
}

export function getFilteredItems({searchTerm = '', statusFilter = 'all'} = {}) {
	const items = getItems();

	const filteredItems = items.filter((item) => {
		const matchesSearch = itemMatchesSearch(item, searchTerm);
		const matchesStatus = itemMatchesStatus(item, statusFilter);

		return matchesSearch && matchesStatus;
	});

	return sortItemsByRecent(filteredItems);
}

export function getItemCounters() {
	const items = getItems();

	return countItemsByStatus(items);
}

export function clearItems() {
	saveItems([]);
}
