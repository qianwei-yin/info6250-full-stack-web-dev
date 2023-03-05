import { catProducts, catCounts } from './data';

(function () {
	const toggleCartEl = document.querySelector('.toggle-cart');
	const productsContentEl = document.querySelector('.products');
	const cartContentEl = document.querySelector('.cart');
	const checkoutContentEl = document.querySelector('.checkout');
	const totalAmountEl = document.querySelector('.text--amount');
	const checkoutBtnEl = document.querySelector('.btn-checkout');

	const state = {
		cartOpen: false,
	};

	toggleCartEl.addEventListener('click', () => {
		state.cartOpen = !state.cartOpen;
		if (state.cartOpen) {
			toggleCartEl.innerText = 'Hide Cart';
		} else {
			displayViewCart();
		}
		render();
	});

	productsContentEl.addEventListener('click', (e) => {
		if (!e.target.classList.contains('add-to-cart')) {
			return;
		}

		const addId = e.target.dataset.id;
		if (catCounts[addId]) {
			catCounts[addId]++;
		} else {
			catCounts[addId] = 1;
		}
		render();
	});

	cartContentEl.addEventListener('click', (e) => {
		if (!e.target.classList.contains('toggle-quantity')) {
			return;
		}

		const toggleId = e.target.parentElement.dataset.id;
		if (e.target.classList.contains('btn-increase')) {
			catCounts[toggleId]++;
		} else {
			catCounts[toggleId]--;
			if (catCounts[toggleId] === 0) {
				delete catCounts[toggleId];
			}
		}
		render();
	});

	checkoutBtnEl.addEventListener('click', () => {
		for (const key in catCounts) {
			delete catCounts[key];
		}
		state.cartOpen = false;
		render();
	});

	function render() {
		if (!state.cartOpen) {
			cartContentEl.classList.add('not-show');
			checkoutContentEl.classList.add('not-show');
			displayViewCart();
		} else {
			cartContentEl.classList.remove('not-show');
			checkoutContentEl.classList.remove('not-show');
		}

		const htmlProducts = generateProductsHtml();
		productsContentEl.innerHTML = htmlProducts;

		let htmlCart = '';
		if (Object.keys(catCounts).length === 0) {
			checkoutBtnEl.disabled = true;
			htmlCart = '<h1 class="empty-cart">Your cart is empty</h1>';
		} else {
			checkoutBtnEl.disabled = false;
			htmlCart = generateCartHtml();
		}
		cartContentEl.innerHTML = htmlCart;

		const totalAmount = calculateTotalAmount();
		totalAmountEl.innerText = `$${totalAmount.toFixed(2)}`;
	}

	function generateProductsHtml() {
		return `
            ${Object.keys(catProducts)
				.map((id) => {
					return `
                        <div class="product">
                            <article class="product__info">
                                <img src="${catProducts[id].url}" alt="${id}" class="info__img" />
                                <div class="info__text">
                                    <span class="info__name">${catProducts[id].name}</span>
                                    <span class="info__price">$${catProducts[id].price}</span>
                                </div>
                            </article>
                            <button class="add-to-cart" data-id="${id}">Add To Cart</button>
                        </div>
                    `;
				})
				.join('')}
        `;
	}

	function generateCartHtml() {
		return `
            <div class="cart__row cart__title">
                <span>Image</span>
                <span>Name</span>
                <span>Total</span>
                <span>Quantity</span>
            </div>
            ${Object.keys(catCounts)
				.map((id) => {
					return `
                        <div class="cart__row cart__product">
                            <img src="${catProducts[id].url}" alt="${id}" class="row__img" />
                            <span>${catProducts[id].name}</span>
                            <span>$${(catProducts[id].price * catCounts[id]).toFixed(2)}</span>
                            <div class="quantity" data-id="${id}">
                                <button class="toggle-quantity btn-decrease">-</button>
                                <span class="row__quantity">${catCounts[id]}</span>
                                <button class="toggle-quantity btn-increase">+</button>
                            </div>
                        </div>
                    `;
				})
				.join('')}
        `;
	}

	function calculateTotalAmount() {
		return Object.keys(catCounts).reduce((acc, id) => {
			acc += Number((catCounts[id] * catProducts[id].price).toFixed(2));
			return acc;
		}, 0);
	}

	function calculateTotalItem() {
		return Object.keys(catCounts).reduce((acc, id) => {
			acc += catCounts[id];
			return acc;
		}, 0);
	}

	function displayViewCart() {
		const totalItem = calculateTotalItem();
		toggleCartEl.innerText = `View Cart${totalItem > 0 ? ` (${totalItem})` : ''}`;
	}

	render();
})();
