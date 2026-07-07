// =============================
// Feature: Example / Items
// File: example.ui.js
// =============================

import {getStatusLabel, getCategoryLabel, getStatusBadgeClass} from './example.model.js';

import {$, $$, showElement, hideElement, toggleElement, setText, clearElement, toggleClass} from '../../shared/dom.js';

import {formatDate, formatCounter} from '../../shared/formatters.js';

import {escapeHTML} from '../../shared/helpers.js';

const elements = {
	itemsGrid: $('#itemsGrid'),
	itemsEmptyState: $('#itemsEmptyState'),

	itemSearchInput: $('#itemSearchInput'),
	filterButtons: $$('[data-filter-status]'),

	totalItemsCounter: $('#totalItemsCounter'),
	activeItemsCounter: $('#activeItemsCounter'),
	pendingItemsCounter: $('#pendingItemsCounter'),
	completedItemsCounter: $('#completedItemsCounter'),
	visibleItemsCounter: $('#visibleItemsCounter'),

	appFeedback: $('#appFeedback'),
	appFeedbackTitle: $('#appFeedbackTitle'),
	appFeedbackMessage: $('#appFeedbackMessage'),

	itemFormModal: $('#itemFormModal'),
	itemFormModalTitle: $('#itemFormModalTitle'),
	itemForm: $('#itemForm'),
	itemIdInput: $('#itemIdInput'),
	itemNameInput: $('#itemNameInput'),
	itemDescriptionInput: $('#itemDescriptionInput'),
	itemCategoryInput: $('#itemCategoryInput'),
	itemStatusInput: $('#itemStatusInput'),
	itemNameError: $('#itemNameError'),

	deleteItemModal: $('#deleteItemModal'),
	deleteItemModalDescription: $('#deleteItemModalDescription')
};

export function getUIElements() {
	return elements;
}

export function renderItems(items = []) {
	clearElement(elements.itemsGrid);

	const hasItems = items.length > 0;

	toggleElement(elements.itemsGrid, hasItems);
	toggleElement(elements.itemsEmptyState, !hasItems);

	if (!hasItems) {
		return;
	}

	const cardsFragment = document.createDocumentFragment();

	items.forEach((item) => {
		cardsFragment.appendChild(createItemCard(item));
	});

	elements.itemsGrid.appendChild(cardsFragment);
}

export function renderCounters(counters) {
	setText(elements.totalItemsCounter, counters.total);
	setText(elements.activeItemsCounter, counters.active);
	setText(elements.pendingItemsCounter, counters.pending);
	setText(elements.completedItemsCounter, counters.completed);
}

export function renderVisibleCounter(count) {
	setText(elements.visibleItemsCounter, formatCounter(count, 'item exibido', 'itens exibidos'));
}

export function setActiveFilter(statusFilter) {
	elements.filterButtons.forEach((button) => {
		const isActive = button.dataset.filterStatus === statusFilter;

		toggleClass(button, 'btn-secondary', isActive);
		toggleClass(button, 'btn-outline', !isActive);
	});
}

export function openCreateItemModal() {
	resetItemForm();

	setText(elements.itemFormModalTitle, 'Novo item');
	showElement(elements.itemFormModal);

	elements.itemNameInput.focus();
}

export function openEditItemModal(item) {
	resetItemForm();

	setText(elements.itemFormModalTitle, 'Editar item');

	elements.itemIdInput.value = item.id;
	elements.itemNameInput.value = item.name;
	elements.itemDescriptionInput.value = item.description;
	elements.itemCategoryInput.value = item.category;
	elements.itemStatusInput.value = item.status;

	showElement(elements.itemFormModal);

	elements.itemNameInput.focus();
}

export function closeItemFormModal() {
	hideElement(elements.itemFormModal);
	resetItemForm();
}

export function getItemFormData() {
	return {
		id: elements.itemIdInput.value,
		name: elements.itemNameInput.value,
		description: elements.itemDescriptionInput.value,
		category: elements.itemCategoryInput.value,
		status: elements.itemStatusInput.value
	};
}

export function showItemFormErrors(errors = {}) {
	const hasNameError = Boolean(errors.name);

	toggleClass(elements.itemNameInput, 'input-error', hasNameError);

	toggleElement(elements.itemNameError, hasNameError);
	setText(elements.itemNameError, errors.name || '');
}

export function clearItemFormErrors() {
	elements.itemNameInput.classList.remove('input-error');

	hideElement(elements.itemNameError);
	setText(elements.itemNameError, '');
}

export function openDeleteItemModal(item) {
	setText(elements.deleteItemModalDescription, `Esta ação removerá o item "${item.name}" da lista.`);

	showElement(elements.deleteItemModal);
}

export function closeDeleteItemModal() {
	hideElement(elements.deleteItemModal);

	setText(elements.deleteItemModalDescription, 'Esta ação removerá o item da lista.');
}

export function showFeedback(type = 'info', title = 'Informação', message = '') {
	const feedbackClasses = ['alert-info', 'alert-success', 'alert-warning', 'alert-danger'];

	elements.appFeedback.classList.remove(...feedbackClasses);
	elements.appFeedback.classList.add(`alert-${type}`);

	setText(elements.appFeedbackTitle, title);
	setText(elements.appFeedbackMessage, message);

	showElement(elements.appFeedback);

	window.clearTimeout(showFeedback.timeoutId);

	showFeedback.timeoutId = window.setTimeout(() => {
		hideElement(elements.appFeedback);
	}, 3500);
}

function resetItemForm() {
	elements.itemForm.reset();
	elements.itemIdInput.value = '';
	clearItemFormErrors();
}

function createItemCard(item) {
	const card = document.createElement('article');

	card.className = 'card gallery-card card-elevated';
	card.dataset.itemId = item.id;

	card.innerHTML = `
    <header class="card-header">
      <div>
        <h2 class="card-title">
          ${escapeHTML(item.name)}
        </h2>

        <p class="card-description">
          ${escapeHTML(item.description || 'Sem descrição informada.')}
        </p>
      </div>

      <span class="badge ${getStatusBadgeClass(item.status)}">
        ${getStatusLabel(item.status)}
      </span>
    </header>

    <div class="card-body">
      <div class="card-meta">
        <span>${getCategoryLabel(item.category)}</span>
        <span>•</span>
        <span>Atualizado em ${formatDate(item.updatedAt)}</span>
      </div>
    </div>

    <footer class="card-footer">
      <button class="btn btn-secondary btn-sm" type="button" data-item-action="edit" data-item-id="${item.id}">
        Editar
      </button>

      <div class="card-actions">
        <button class="btn btn-ghost btn-sm" type="button" data-item-action="duplicate" data-item-id="${item.id}">
          Duplicar
        </button>

        <button class="btn btn-ghost btn-sm" type="button" data-item-action="delete" data-item-id="${item.id}">
          Excluir
        </button>
      </div>
    </footer>
  `;

	return card;
}
