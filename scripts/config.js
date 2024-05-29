function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid;
  playerConfigOverlay.style.display = "block";
  backdrop.style.display = "block";
}

function closePlayerConfig() {
  playerConfigOverlay.style.display = "none";
  backdrop.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutput.textContent = "";
	formElement.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim();

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("error");
    errorsOutput.textContent = "Please enter a valid name.";
    return;
  }

  const updatedPlayerData = document.getElementById('player-' + editedPlayer + '-data');
  updatedPlayerData.children[1].textContent = enteredPlayerName;

	// if (editedPlayer === 1) {
	// 	players[0].name = enteredPlayerName;
	// } else {
	// 	players[1].name = enteredPlayerName;
	// }

	// Above code would work, but we can simplify it by using the editedPlayer variable

	players[editedPlayer - 1].name = enteredPlayerName;
	closePlayerConfig();
}
