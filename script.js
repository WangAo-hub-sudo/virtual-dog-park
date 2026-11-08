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

/* ===== My Virtual Dog feature ===== */

// This variable remembers the dog the visitor adopted.
// It starts as null, meaning "no dog yet".
var myDog = null;

// Runs when the visitor clicks the "Adopt" button (or presses Enter in the form).
// It reads the chosen breed and name, checks the name, and creates the dog.
function handleAdoptFormSubmit(event) {
  // Stop the browser from reloading the page, which is a form's default behavior.
  event.preventDefault();

  var breed = document.getElementById("breed-select").value;
  var nameInput = document.getElementById("dog-name");
  var errorBox = document.getElementById("form-error");

  // Remove spaces from the start and end of the name,
  // but keep spaces in the middle (e.g. "La La" stays "La La").
  var name = nameInput.value.trim();

  // Validation 1: the name must not be empty after trimming.
  if (name === "") {
    errorBox.textContent = "Please give your dog a name before adopting.";
    return; // stop here, do not adopt
  }

  // Validation 2: the name must be at most 20 characters.
  if (name.length > 20) {
    errorBox.textContent = "That name is too long. Please use 20 characters or fewer.";
    return;
  }

  // The name looks good: clear any old error message and create the dog.
  errorBox.textContent = "";
  myDog = {
    name: name,
    breed: breed,
    day: 1,       // every new dog starts on Day 1
    stage: "Puppy",
    happiness: 50 // happiness starts at 50 out of 100
  };

  // Show the dog on the screen.
  renderDog();
}

// Paints the current dog's information onto the page.
// We use textContent for every piece of text, so whatever name the visitor
// types is shown as plain text and is never treated as HTML.
function renderDog() {
  if (!myDog) return; // nothing to show

  // Make the status card visible.
  document.getElementById("dog-status").classList.remove("hidden");

  document.getElementById("dog-display-name").textContent = myDog.name;
  document.getElementById("dog-breed").textContent = myDog.breed;
  document.getElementById("dog-day").textContent = myDog.day;
  document.getElementById("dog-stage").textContent = myDog.stage;
  document.getElementById("dog-happiness").textContent = myDog.happiness;
}

// Changes the dog's happiness by the given amount (Feed and Play both use +10).
// Happiness can never go above 100.
function changeHappiness(amount) {
  if (!myDog) return; // no dog adopted yet

  myDog.happiness = myDog.happiness + amount;
  if (myDog.happiness > 100) {
    myDog.happiness = 100;
  }

  // Redraw the card so the new number appears.
  renderDog();
}

// Connects the form and buttons to their functions when the page loads.
function setupVirtualDog() {
  document.getElementById("adopt-form").addEventListener("submit", handleAdoptFormSubmit);

  document.getElementById("feed-btn").addEventListener("click", function () {
    changeHappiness(10);
  });

  document.getElementById("play-btn").addEventListener("click", function () {
    changeHappiness(10);
  });
}

setupVirtualDog();
