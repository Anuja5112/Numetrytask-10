// Retrieve cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function displayCartItems() {
    const cartItemsDiv = document.getElementById('cart-items');
    cartItemsDiv.innerHTML = '';

    if (cart.length === 0) {
        cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <h2>${product.title}</h2>
            <div class="details">
                <p class="vendor"><strong>${product.vendor}</strong></p>
                <p class="category"><strong>${product.product_type}</strong></p>
                <p class="price">Price: <strong>${product.price}</strong> <span class="compare-at-price">${product.compare_at_price}</span></p>
            </div>
            <div class="actions">
                <button class="remove-from-cart" onclick="removeFromCart(${product.id})">Remove from Cart</button>
                <button class="buy-now" onclick="buyNow(${product.id})">Buy Now</button>
            </div>
        `;
        cartItemsDiv.appendChild(productDiv);
    });
}

function removeFromCart(productId) {
    cart = cart.filter(p => p.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
}

function buyNow(productId) {
    const product = cart.find(p => p.id === productId);
    alert(`You bought ${product.title}!`);
}

function updateCartCount() {
    const cartCount = cart.length;
    // Ensure cart count is updated on the header if the user navigates back to the products page
    if (document.getElementById('cart-count')) {
        document.getElementById('cart-count').textContent = cartCount;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayCartItems();
    updateCartCount();
});
