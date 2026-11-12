// Open or close the mobile menu
function toggleMenu() {
  const menu = document.getElementById("navMenu");
  const button = document.querySelector(".menuToggle");

  menu.classList.toggle("active");
  button.setAttribute("aria-expanded", menu.classList.contains("active"));
}

// Show the total quantity beside Cart
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("beanBoutiqueCart")) || [];
  const badge = document.getElementById("cartCount");
  let count = 0;

  cart.forEach(function (item) {
    count = count + item.quantity;
  });

  badge.textContent = count;

  // Hide the badge when the cart is empty
  if (count > 0) {
    badge.hidden = false;
  } else {
    badge.hidden = true;
  }
}

// Read the saved count when the page opens
updateCartCount();
