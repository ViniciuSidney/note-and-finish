// =============================
// Shared: DOM Helpers
// File: dom.js
// =============================

export function $(selector, parent = document) {
	return parent.querySelector(selector);
}

export function $$(selector, parent = document) {
	return Array.from(parent.querySelectorAll(selector));
}

export function showElement(element) {
	if (!element) return;

	element.hidden = false;
}

export function hideElement(element) {
	if (!element) return;

	element.hidden = true;
}

export function toggleElement(element, shouldShow) {
	if (!element) return;

	element.hidden = !shouldShow;
}

export function setText(element, value) {
	if (!element) return;

	element.textContent = value;
}

export function setHTML(element, value) {
	if (!element) return;

	element.innerHTML = value;
}

export function clearElement(element) {
	if (!element) return;

	element.innerHTML = '';
}

export function addClass(element, className) {
	if (!element || !className) return;

	element.classList.add(className);
}

export function removeClass(element, className) {
	if (!element || !className) return;

	element.classList.remove(className);
}

export function toggleClass(element, className, condition) {
	if (!element || !className) return;

	element.classList.toggle(className, condition);
}

export function getClosest(element, selector) {
	if (!element) return null;

	return element.closest(selector);
}

export function createElement(tagName, options = {}) {
	const element = document.createElement(tagName);

	if (options.className) {
		element.className = options.className;
	}

	if (options.textContent) {
		element.textContent = options.textContent;
	}

	if (options.html) {
		element.innerHTML = options.html;
	}

	if (options.attributes) {
		Object.entries(options.attributes).forEach(([name, value]) => {
			element.setAttribute(name, value);
		});
	}

	if (options.dataset) {
		Object.entries(options.dataset).forEach(([name, value]) => {
			element.dataset[name] = value;
		});
	}

	return element;
}
