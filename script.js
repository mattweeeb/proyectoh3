const cart = [];
const cartButton = document.querySelector('.cart-trigger');
const cartCount = document.querySelector('.cart-count');
const cartModal = document.querySelector('#cartModal');
const checkoutModal = document.querySelector('#checkoutModal');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const checkoutItems = document.querySelector('.checkout-items');
const checkoutTotal = document.querySelector('.checkout-total');

function getProduct(card) {
  return {
    name: card.querySelector('h4').textContent.trim(),
    price: Number(card.dataset.price)
  };
}

function formatPrice(price) {
  return `Bs ${price} aprox.`;
}

function updateCart() {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = itemCount;
  cartButton.setAttribute('aria-label', `Abrir carrito, ${itemCount} ${itemCount === 1 ? 'producto' : 'productos'}`);

  document.querySelectorAll('.card').forEach((card) => {
    const productName = card.querySelector('h4').textContent.trim();
    const addButton = card.querySelector('[data-action="add"]');
    const isInCart = cart.some((item) => item.name === productName);
    addButton.classList.toggle('is-added', isInCart);
    addButton.textContent = isInCart ? 'Quitar del carrito' : 'Agregar al carrito';
    addButton.setAttribute(
      'aria-label',
      `${isInCart ? 'Quitar' : 'Agregar'} ${productName} ${isInCart ? 'del' : 'al'} carrito`
    );
  });

  cartItemsContainer.replaceChildren();
  if (cart.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.className = 'cart-empty';
    emptyMessage.textContent = 'Tu carrito está vacío.';
    cartItemsContainer.append(emptyMessage);
  }

  cart.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'cart-item';

    const details = document.createElement('p');
    details.textContent = `${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`;

    const removeButton = document.createElement('button');
    removeButton.className = 'cart-remove';
    removeButton.type = 'button';
    removeButton.textContent = 'Quitar';
    removeButton.setAttribute('aria-label', `Quitar ${item.name} del carrito`);
    removeButton.addEventListener('click', () => {
      cart.splice(index, 1);
      updateCart();
    });

    row.append(details, removeButton);
    cartItemsContainer.append(row);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = cart.length ? `Total: ${formatPrice(total)}` : '';
  document.querySelector('.cart-checkout').disabled = cart.length === 0;
}

function openModal(modal, returnFocusTo) {
  modal.inert = false;
  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('active');
  if (returnFocusTo) modal._returnFocusTo = returnFocusTo;

  const firstFocusable = modal.querySelector('button:not(:disabled), input:not(:disabled)');
  (firstFocusable || modal.querySelector('[role="dialog"]')).focus();
}

function closeModal(modal, restoreFocus = true) {
  if (!modal.classList.contains('active')) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modal.inert = true;
  if (restoreFocus && modal._returnFocusTo) modal._returnFocusTo.focus();
  modal._returnFocusTo = null;
}

function prepareCheckout(items, returnFocusTo) {
  checkoutItems.replaceChildren();
  items.forEach((item) => {
    const itemLine = document.createElement('p');
    itemLine.textContent = `${item.name} × ${item.quantity} — ${formatPrice(item.price * item.quantity)}`;
    checkoutItems.append(itemLine);
  });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  checkoutTotal.textContent = `Total: ${formatPrice(total)}`;
  document.querySelector('.checkout-status').textContent = '';
  document.querySelector('.checkout-form').reset();
  openModal(checkoutModal, returnFocusTo);
}

document.querySelector('.cards').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;

  const card = button.closest('.card');
  const product = getProduct(card);
  if (button.dataset.action === 'buy') {
    prepareCheckout([{ ...product, quantity: 1 }], button);
  } else {
    const existingItem = cart.find((item) => item.name === product.name);
    if (existingItem) {
      cart.splice(cart.indexOf(existingItem), 1);
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }
});

cartButton.addEventListener('click', () => {
  updateCart();
  openModal(cartModal, cartButton);
});

document.querySelector('.cart-checkout').addEventListener('click', () => {
  closeModal(cartModal, false);
  prepareCheckout(cart.map((item) => ({ ...item })), cartButton);
});

document.querySelectorAll('.modal-overlay').forEach((modal) => {
  modal.addEventListener('click', (event) => {
    if (event.target === modal || event.target.closest('.close-modal')) {
      closeModal(modal);
    }
  });

  modal.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const focusable = [...modal.querySelectorAll('button:not(:disabled), input:not(:disabled)')];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.active').forEach((modal) => closeModal(modal));
  }
});

document.querySelector('.checkout-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('.checkout-status').textContent =
    'Pedido de demostración preparado. No se realizó ningún cobro ni se envió un pedido real.';
});

updateCart();
