/* ===== Virtual Dog Park script ===== */

// 1. Show a time-of-day greeting (morning / afternoon / evening).
function showGreeting() {
  var hour = new Date().getHours(); // current hour, 0-23
  var greetingElement = document.getElementById("greeting");
  var message;

  if (hour < 12) {
    message = "Good morning! The dogs are stretching in the sun.";
  } else if (hour < 18) {
    message = "Good afternoon! Perfect time for a walk around the park.";
  } else {
    message = "Good evening! The park is quieting down after a fun day.";
  }

  greetingElement.textContent = message;
}

// 2. Let the visitor click a breed card to mark / unmark it as a favorite.
function setupFavoriteButtons() {
  var buttons = document.querySelectorAll(".favorite-btn");

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      // Move up from the button to the card that contains it.
      var card = button.closest(".breed-card");

      // Toggle the "favorite" highlight and the button label.
      card.classList.toggle("favorite");

      if (card.classList.contains("favorite")) {
        button.textContent = "♥ Favorite!";
      } else {
        button.textContent = "Mark as favorite";
      }
    });
  });
}

// Run both small features once the page has finished loading.
showGreeting();
setupFavoriteButtons();
