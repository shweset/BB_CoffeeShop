// Category links in the Events dropdown
const categoryLinks = document.querySelectorAll(".menu .dropdown-item");

// Open the category selected from the navbar
function openEventTab() {
  const category = window.location.hash.substring(1);
  const selectedCategory = category === "" ? "upcomingEvents" : category;
  const tabButton = document.getElementById(selectedCategory + "Tab");
  const title = document.getElementById("eventsTitle");

  // Keep the selected category when opening the registration form
  if (tabButton !== null) {
    bootstrap.Tab.getOrCreateInstance(tabButton).show();

    if (selectedCategory === "upcomingEvents") {
      title.textContent = "Upcoming Events";
    } else if (selectedCategory === "workshops") {
      title.textContent = "Coffee Workshops";
    } else if (selectedCategory === "lessons") {
      title.textContent = "Coffee Lessons";
    }

    // Highlight only the selected dropdown link
    categoryLinks.forEach(function (link) {
      if (link.getAttribute("href") === "events.html#" + selectedCategory) {
        link.classList.add("active");
        link.setAttribute("aria-current", "true");
      } else {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
      }
    });
  }
}

// Change categories without jumping to an anchor
categoryLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    history.replaceState(null, "", link.getAttribute("href"));
    openEventTab();
  });
});

window.addEventListener("hashchange", openEventTab);
openEventTab();
