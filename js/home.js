// Set up the home slideshow
const swiper = new Swiper(".homeSlider", {
  loop: true,

  pagination: {
    el: ".homeSlider .swiper-pagination",
    clickable: true
  },

  navigation: {
    nextEl: ".homeSlider .swiper-button-next",
    prevEl: ".homeSlider .swiper-button-prev"
  }
});

// Enquiry form feedback
function checkEnquiry(event) {
  event.preventDefault();

  document.getElementById("enquiryStatus").textContent =
    "Your details are valid. Sending is not connected yet.";
}

// Set up the welcome offer popup
const offerElement = document.getElementById("offerModal");
const offerModal = new bootstrap.Modal(offerElement);
const offerForm = document.getElementById("offerForm");

// Show the welcome offer after every page load
setTimeout(function () {
  offerModal.show();
}, 1000);

// Show the discount code after a valid email is entered
offerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  document.getElementById("offerMessage").textContent =
    "Your welcome code is WELCOME10. This demo does not send emails.";

  offerForm.hidden = true;
});
