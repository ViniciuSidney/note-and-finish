// =============================
// Feature: Example / Items
// File: example.controller.js
// =============================

import {validateItem} from './example.model.js';

import {addItem, editItem, deleteItem, findItemById, getFilteredItems, getItemCounters} from './example.service.js';

import {
	getUIElements,
	renderItems,
	renderCounters,
	renderVisibleCounter,
	setActiveFilter,
	openCreateItemModal,
	openEditItemModal,
	closeItemFormModal,
	getItemFormData,
	showItemFormErrors,
	clearItemFormErrors,
	openDeleteItemModal,
	closeDeleteItemModal,
	showFeedback
} from './example.ui.js';

import {debounce} from '../../shared/helpers.js';

const state = {
	searchTerm: '',
	statusFilter: 'all',
	itemPendingDeleteId: null
};

export function initExampleFeature() {
	const elements = getUIElements();

	bindEvents(elements);
	updateView();
}

function bindEvents(elements) {
	document.querySelector('#openCreateItemModalButton').addEventListener('click', openCreateItemModal);

	document.querySelector('#createFirstItemButton').addEventListener('click', openCreateItemModal);

	elements.itemSearchInput.addEventListener(
		'input',
		debounce((event) => {
			state.searchTerm = event.target.value;
			updateView();
		}, 250)
	);

	elements.filterButtons.forEach((button) => {
		button.addEventListener('click', () => {
			state.statusFilter = button.dataset.filterStatus;
			updateView();
		});
	});

	elements.itemsGrid.addEventListener('click', handleItemCardAction);

	elements.itemForm.addEventListener('submit', handleItemFormSubmit);

	document.querySelector('#closeItemFormModalButton').addEventListener('click', closeItemFormModal);

	document.querySelector('#cancelItemFormButton').addEventListener('click', closeItemFormModal);

	document.querySelector('#closeDeleteItemModalButton').addEventListener('click', closeDeleteModal);

	document.querySelector('#cancelDeleteItemButton').addEventListener('click', closeDeleteModal);

	document.querySelector('#confirmDeleteItemButton').addEventListener('click', handleConfirmDelete);

	elements.itemFormModal.addEventListener('click', (event) => {
		if (event.target === elements.itemFormModal) {
			closeItemFormModal();
		}
	});

	elements.deleteItemModal.addEventListener('click', (event) => {
		if (event.target === elements.deleteItemModal) {
			closeDeleteModal();
		}
	});

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			closeItemFormModal();
			closeDeleteModal();
		}
	});
}

function handleItemFormSubmit(event) {
	event.preventDefault();

	const formData = getItemFormData();
	const validation = validateItem(formData);

	if (!validation.isValid) {
		showItemFormErrors(validation.errors);
		showFeedback('warning', 'Revise o formulário', 'Algumas informações precisam ser corrigidas.');
		return;
	}

	clearItemFormErrors();

	const isEditing = Boolean(formData.id);

	if (isEditing) {
		editItem(formData.id, formData);
		showFeedback('success', 'Item atualizado', 'As alterações foram salvas com sucesso.');
	} else {
		addItem(formData);
		showFeedback('success', 'Item criado', 'O novo item foi adicionado à lista.');
	}

	closeItemFormModal();
	updateView();
}

function handleItemCardAction(event) {
	const actionButton = event.target.closest('[data-item-action]');

	if (!actionButton) {
		return;
	}

	const action = actionButton.dataset.itemAction;
	const itemId = actionButton.dataset.itemId;
	const item = findItemById(itemId);

	if (!item) {
		showFeedback('danger', 'Item não encontrado', 'Não foi possível localizar o item selecionado.');
		updateView();
		return;
	}

	if (action === 'edit') {
		openEditItemModal(item);
		return;
	}

	if (action === 'duplicate') {
		duplicateItem(item);
		return;
	}

	if (action === 'delete') {
		state.itemPendingDeleteId = item.id;
		openDeleteItemModal(item);
	}
}

function duplicateItem(item) {
	addItem({
		name: `${item.name} cópia`,
		description: item.description,
		category: item.category,
		status: item.status
	});

	showFeedback('success', 'Item duplicado', 'Uma cópia do item foi criada.');
	updateView();
}

function handleConfirmDelete() {
	if (!state.itemPendingDeleteId) {
		closeDeleteModal();
		return;
	}

	deleteItem(state.itemPendingDeleteId);

	state.itemPendingDeleteId = null;

	closeDeleteModal();
	updateView();

	showFeedback('success', 'Item excluído', 'O item foi removido da lista.');
}

function closeDeleteModal() {
	state.itemPendingDeleteId = null;
	closeDeleteItemModal();
}

function updateView() {
	const filteredItems = getFilteredItems({
		searchTerm: state.searchTerm,
		statusFilter: state.statusFilter
	});

	const counters = getItemCounters();

	renderItems(filteredItems);
	renderCounters(counters);
	renderVisibleCounter(filteredItems.length);
	setActiveFilter(state.statusFilter);
}
