// Read saved cart items
let cart = JSON.parse(localStorage.getItem("beanBoutiqueCart")) || [];
let appliedCode = sessionStorage.getItem("beanBoutiquePromo") || "";

// Display the shopping cart
function displayCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  // Clear the previous cart display
  cartItems.textContent = "";

  if (cart.length === 0) {
    cartItems.textContent = "Your cart is empty.";
    cartTotal.textContent = "";
    renderTotals();
    return;
  }

  cart.forEach(function (item, index) {
    const itemTotal = item.price * item.quantity;

    // Create a row for this product
    const cartItem = document.createElement("div");
    cartItem.className = "cartItem";

    // Create the product details
    const details = document.createElement("div");

    const name = document.createElement("h2");
    name.textContent = item.name;

    const price = document.createElement("p");
    price.textContent = "Price: ฿" + item.price;

    const quantity = document.createElement("p");
    quantity.textContent = "Quantity: " + item.quantity;

    const subtotal = document.createElement("p");
    subtotal.textContent = "Subtotal: ฿" + itemTotal;

    // Create the Remove button
    const removeButton = document.createElement("button");
    removeButton.type = "button";
    removeButton.className = "cartRemove";
    removeButton.textContent = "Remove";

    removeButton.onclick = function () {
      removeItem(index);
    };

    // Put the details inside the product row
    details.appendChild(name);
    details.appendChild(price);
    details.appendChild(quantity);
    details.appendChild(subtotal);

    cartItem.appendChild(details);
    cartItem.appendChild(removeButton);

    // Add the finished row to the page
    cartItems.appendChild(cartItem);
  });

  renderTotals();
}

// Remove an item and update the saved cart
function removeItem(index) {
  cart.splice(index, 1);

  localStorage.setItem("beanBoutiqueCart", JSON.stringify(cart));

  updateCartCount();

  displayCart();
}



// Open checkout when the cart contains products
function openCheckout() {
  if (cart.length === 0) {
    document.getElementById("cartTotal").textContent =
      "Add a product before checking out.";
    return;
  }

  renderTotals();
  const totals = calculateTotals();
  document.getElementById("checkoutTotal").textContent =
    "Subtotal: ฿" + totals.subtotal.toFixed(2) +
    " | Discount (" + (appliedCode || "none") + "): ฿" + totals.discount.toFixed(2) +
    " | Order total: ฿" + totals.total.toFixed(2);

  const modalElement = document.getElementById("checkoutModal");
  bootstrap.Modal.getOrCreateInstance(modalElement).show();
}

// Complete demo checkout and empty the cart
function reviewCheckout(event) {
  event.preventDefault();

  // Record only completed orders in this browser demo.
  // Respect the earlier coffee-order marker without changing or deleting it.
  if (cart.length > 0) {
    localStorage.setItem("beanBoutiqueOrderCompleted", "true");
  }

  appliedCode = "";
  sessionStorage.removeItem("beanBoutiquePromo");
  document.getElementById("promoMessage").textContent = "";
  cart = [];
  localStorage.removeItem("beanBoutiqueCart");

  displayCart();
  updateCartCount();

  event.target.reset();

  const modalElement = document.getElementById("checkoutModal");
  bootstrap.Modal.getOrCreateInstance(modalElement).hide();
}

// Use the same rounded full-order calculation for the cart and checkout.
function calculateTotals() {
  let subtotal = 0;
  cart.forEach(function (item) {
    subtotal += item.price * item.quantity;
  });

  let rate = 0;
  let reason = "";
  if (appliedCode === "WELCOME10") {
    const orderCompleted =
      localStorage.getItem("beanBoutiqueOrderCompleted") === "true" ||
      localStorage.getItem("beanBoutiqueCoffeeOrderCompleted") === "true";

    if (orderCompleted) {
      reason = "WELCOME10 is only available on your first order.";
    } else {
      rate = 0.10;
    }
  } else if (appliedCode !== "") {
    reason = "Unknown promo code.";
  }

  const discount = Math.round(subtotal * rate * 100) / 100;
  return {
    subtotal: subtotal,
    discount: discount,
    total: Math.round((subtotal - discount) * 100) / 100,
    reason: reason
  };
}

function renderTotals() {
  let totals = calculateTotals();
  const message = document.getElementById("promoMessage");
  if (appliedCode && (totals.reason || cart.length === 0)) {
    message.textContent = totals.reason || "Your cart is empty. Promo code removed.";
    appliedCode = "";
    sessionStorage.removeItem("beanBoutiquePromo");
    totals = calculateTotals();
  }

  document.getElementById("promoFields").disabled = cart.length === 0;
  document.getElementById("removePromo").hidden = appliedCode === "";
  document.getElementById("promoCode").value = appliedCode;
  document.getElementById("cartSubtotal").textContent = cart.length ?
    "Subtotal: ฿" + totals.subtotal.toFixed(2) : "";
  document.getElementById("cartDiscount").textContent = cart.length ?
    "Discount (" + (appliedCode || "none") + "): ฿" + totals.discount.toFixed(2) : "";
  document.getElementById("cartTotal").textContent = cart.length ?
    "Total: ฿" + totals.total.toFixed(2) : "";
}

function applyPromo(event) {
  event.preventDefault();
  const input = document.getElementById("promoCode");
  const candidate = input.value.trim().toUpperCase();
  const previousCode = appliedCode;
  appliedCode = candidate;
  const totals = calculateTotals();
  const message = document.getElementById("promoMessage");

  if (candidate === "" || totals.reason || cart.length === 0) {
    appliedCode = previousCode;
    message.textContent = candidate === "" ? "Enter a promo code." :
      (totals.reason || "Add a product before applying a code.");
    renderTotals();
    return;
  }

  sessionStorage.setItem("beanBoutiquePromo", appliedCode);
  message.textContent = appliedCode + " applied to your order.";
  renderTotals();
}

function removePromoCode() {
  appliedCode = "";
  sessionStorage.removeItem("beanBoutiquePromo");
  document.getElementById("promoMessage").textContent = "Promo code removed.";
  renderTotals();
}

// Restore the saved cart and eligible promo when the page opens.
displayCart();
