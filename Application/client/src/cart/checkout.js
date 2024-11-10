window.onload = function () {
  loadCartItems();
};

// Load cart items from localStorage
function loadCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const totalElement = document.getElementById("total");

  cartItemsContainer.innerHTML = ""; // Clear existing items
  let subtotal = 0;
  let shippingCost = 5.0; // Flat shipping cost or could be dynamic
  let total = 0;

  // Create cart item elements
  cart.forEach((item) => {
    const cartItemElement = createCartItemElement(item);
    cartItemsContainer.appendChild(cartItemElement);
    subtotal += item.price * item.quantity;
  });

  // Set the subtotal element
  subtotalElement.textContent = `$${subtotal.toFixed(2)}`;

  // Calculate the total (subtotal + shipping)
  total = subtotal + shippingCost;

  // Set the shipping and total elements
  shippingElement.textContent = `$${shippingCost.toFixed(2)}`;
  totalElement.textContent = `$${total.toFixed(2)}`;
}

// Create a cart item element (this can be customized as needed)
function createCartItemElement(item) {
  const div = document.createElement("div");
  div.classList.add("cart-item");

  // Add item name, quantity, and price
  div.innerHTML = `
        <div class="item-name">${item.name}</div>
        <div class="item-quantity">Quantity: ${item.quantity}</div>
        <div class="item-price">$${(item.price * item.quantity).toFixed(
          2
        )}</div>
    `;
  return div;
}

// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function () {
  const paymentSelect = document.getElementById("payment");
  const creditCardFields = document.getElementById("credit-card-fields");
  const paypalFields = document.getElementById("paypal-fields");

  // Listen for changes on the payment method selection
  paymentSelect.addEventListener("change", function () {
    const paymentMethod = paymentSelect.value;

    // Hide all payment fields initially
    creditCardFields.style.display = "none";
    paypalFields.style.display = "none";

    // Show the relevant fields based on the payment method
    if (paymentMethod === "credit-card") {
      creditCardFields.style.display = "block";
    } else if (paymentMethod === "paypal") {
      paypalFields.style.display = "block";
    }
  });
});
