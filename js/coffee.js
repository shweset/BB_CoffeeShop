// Animate the coffee cards as they scroll into view
AOS.init({
  duration: 600,
  once: true
});

// Set up the coffee image gallery
lightbox.option({
  resizeDuration: 200,
  wrapAround: true,
  alwaysShowNavOnTouchDevices: true
});

// Search coffee by name
function filterItems() {
  const searchText = document.getElementById("coffeeSearch").value
    .trim()
    .toLowerCase();
  const cards = document.querySelectorAll(".coffeeSection .row > div");
  const message = document.getElementById("coffeeSearchMessage");
  let matchCount = 0;

  // Show only cards whose names match the search
  cards.forEach(function (card) {
    const coffeeName = card.querySelector(".card-title").textContent
      .toLowerCase();

    if (coffeeName.includes(searchText)) {
      card.hidden = false;
      matchCount++;
    } else {
      card.hidden = true;
    }
  });

  // Explain when the search has no matches
  if (matchCount === 0) {
    message.textContent = "No coffee found. Try another name.";
  } else {
    message.textContent = "";
  }

  AOS.refresh();
}

// Save selected coffee in the cart
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
