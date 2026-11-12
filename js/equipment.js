// Animate the equipment cards as they scroll into view
AOS.init({
  duration: 600,
  once: true
});

// Save selected equipment in the cart
function addToCart(name, price) {
  const cart = JSON.parse(localStorage.getItem("beanBoutiqueCart")) || [];
  let existingItem = null;

  // Find the product if it is already in the cart
  cart.forEach(function (item) {
    if (item.name === name) {
      existingItem = item;
    }
  });

  // Increase its quantity or add a new product
  if (existingItem !== null) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  // Save the cart and update the page feedback
  localStorage.setItem("beanBoutiqueCart", JSON.stringify(cart));
  updateCartCount();

  document.getElementById("cartMessage").textContent =
    name + " added to your cart.";
}

// Search equipment by name
function filterEquipment() {
  const searchText = document.getElementById("equipmentSearch").value
    .trim()
    .toLowerCase();
  const cards = document.querySelectorAll(".equipmentSection .row > div");
  const message = document.getElementById("equipmentSearchMessage");
  let matchCount = 0;

  // Show only cards whose names match the search
  cards.forEach(function (card) {
    const equipmentName = card.querySelector(".card-title").textContent
      .toLowerCase();

    if (equipmentName.includes(searchText)) {
      card.hidden = false;
      matchCount++;
    } else {
      card.hidden = true;
    }
  });

  if (matchCount === 0) {
    message.textContent = "No equipment found. Try another name.";
  } else {
    message.textContent = "";
  }

  AOS.refresh();
}
