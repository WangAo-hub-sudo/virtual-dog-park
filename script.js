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

// The name under which we save the dog in the browser's localStorage.
// localStorage keeps the data on this computer, in this browser,
// even after the tab is closed or the computer restarts.
// It lives in the browser's profile folder (DevTools > Application > Local Storage).
var STORAGE_KEY = "virtualDogParkPetV1";

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

// Works out the growth stage from the day number:
//   Day 1       -> Puppy
//   Days 2 and 3 -> Young Dog
//   Day 4 onward -> Adult Dog
function getStageForDay(day) {
  if (day <= 1) return "Puppy";
  if (day <= 3) return "Young Dog";
  return "Adult Dog";
}

// Picks the right picture file for the chosen breed.
function breedToImage(breed) {
  if (breed === "Beagle") return "assets/beagle.svg";
  if (breed === "Poodle") return "assets/poodle.svg";
  return "assets/golden.svg";
}

// Picks a CSS class that makes the picture bigger as the dog grows.
function stageToSizeClass(stage) {
  if (stage === "Puppy") return "size-puppy";
  if (stage === "Young Dog") return "size-young";
  return "size-adult";
}

// Paints the current dog's information onto the page.
// We use textContent for every piece of text, so whatever name the visitor
// types is shown as plain text and is never treated as HTML.
// This function also saves the latest state to localStorage every time it runs.
function renderDog() {
  if (!myDog) return; // nothing to show

  // Make the status card visible and hide the adoption form.
  document.getElementById("dog-status").classList.remove("hidden");
  document.getElementById("adopt-form").classList.add("hidden");

  document.getElementById("dog-display-name").textContent = myDog.name;
  document.getElementById("dog-breed").textContent = myDog.breed;
  document.getElementById("dog-day").textContent = myDog.day;

  // Work out the stage from the day and write it out as text.
  // (The picture and bar are extra visuals, but the stage is also a real label.)
  var stage = getStageForDay(myDog.day);
  myDog.stage = stage;
  document.getElementById("dog-stage").textContent = stage;

  document.getElementById("dog-happiness").textContent = myDog.happiness;

  // Show the breed's picture at a size that matches its stage.
  var photo = document.getElementById("dog-photo");
  photo.src = breedToImage(myDog.breed);
  photo.alt = "Illustration of your " + myDog.breed + ".";
  photo.className = "dog-photo " + stageToSizeClass(stage);

  // Growth bar: Day 1 starts at 25%, and it fills up to 100% by Day 4.
  var fillPercent = Math.min(100, (myDog.day / 4) * 100);
  document.getElementById("growth-fill").style.width = fillPercent + "%";

  // Save the latest state right away.
  saveDog();
}

// Saves the dog to the browser. The object is turned into a text string first.
function saveDog() {
  if (!myDog) return;
  var data = {
    name: myDog.name,
    breed: myDog.breed,
    day: myDog.day,
    happiness: myDog.happiness
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Reads the saved dog back when the page loads.
// If nothing is saved, or the saved text is broken, we just start fresh.
function loadSavedDog() {
  var raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;

  try {
    var data = JSON.parse(raw);
    if (data && typeof data.name === "string") {
      myDog = {
        name: data.name,
        breed: data.breed,
        day: data.day,
        happiness: data.happiness
      };
      renderDog();
    }
  } catch (err) {
    // The saved text was not valid JSON; ignore it and start with no dog.
  }
}

// Changes the dog's happiness by the given amount (Feed and Play both use +10).
// Happiness can never go above 100.
function changeHappiness(amount) {
  if (!myDog) return; // no dog adopted yet

  myDog.happiness = myDog.happiness + amount;
  if (myDog.happiness > 100) {
    myDog.happiness = 100;
  }

  // Redraw the card so the new number appears (this also re-saves the dog).
  renderDog();
}

// Advances to the next day: +1 day, -5 happiness (but never below 0).
function nextDay() {
  if (!myDog) return;

  myDog.day = myDog.day + 1;
  myDog.happiness = myDog.happiness - 5;
  if (myDog.happiness < 0) {
    myDog.happiness = 0;
  }

  renderDog();
}

// Deletes the saved dog and goes back to the adoption form.
// The browser asks for confirmation first; cancelling keeps the dog.
function startOver() {
  var reallySure = confirm(
    "Throw away your saved dog and start over?\nThis cannot be undone."
  );
  if (!reallySure) return; // visitor clicked Cancel — keep the dog

  myDog = null;
  localStorage.removeItem(STORAGE_KEY);

  // Hide the status card and bring the adoption form back.
  document.getElementById("dog-status").classList.add("hidden");
  document.getElementById("adopt-form").classList.remove("hidden");
  document.getElementById("dog-name").value = "";
  document.getElementById("form-error").textContent = "";
}

// Connects the form and buttons to their functions when the page loads,
// then restores any previously saved dog.
function setupVirtualDog() {
  document.getElementById("adopt-form").addEventListener("submit", handleAdoptFormSubmit);

  document.getElementById("feed-btn").addEventListener("click", function () {
    changeHappiness(10);
  });

  document.getElementById("play-btn").addEventListener("click", function () {
    changeHappiness(10);
  });

  document.getElementById("nextday-btn").addEventListener("click", nextDay);
  document.getElementById("startover-btn").addEventListener("click", startOver);

  // If the visitor saved a dog earlier, bring it back.
  loadSavedDog();
}

setupVirtualDog();
