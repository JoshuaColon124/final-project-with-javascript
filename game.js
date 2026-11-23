const marker = document.querySelector("#shot-marker");
const target = document.querySelector("#shot-target");
const shootButton = document.querySelector("#shoot-button");
const replayButton = document.querySelector("#replay-button");
const message = document.querySelector("#game-message");

let makes = 0;
let shots = 0;
const shotLimit = 10;

function updateScore() {
    document.querySelector("#makes").textContent = makes;
    document.querySelector("#shots").textContent = `${shots} / ${shotLimit}`;
    document.querySelector("#accuracy").textContent =
        `${shots ? Math.round((makes / shots) * 100) : 0}%`;
}

function takeShot() {
    if (shots >= shotLimit) return;

    const markerCenter = marker.getBoundingClientRect().left + marker.offsetWidth / 2;
    const zone = target.getBoundingClientRect();
    const made = markerCenter >= zone.left && markerCenter <= zone.right;

    shots += 1;
    if (made) makes += 1;
    updateScore();

    if (shots === shotLimit) {
        shootButton.disabled = true;
        replayButton.hidden = false;
        message.textContent = `Final score: ${makes} out of ${shotLimit}. Play again?`;
    } else {
        message.textContent = made ? "Swish! Nice timing." : "Miss. Watch the green zone.";
    }
}

function playAgain() {
    makes = 0;
    shots = 0;
    shootButton.disabled = false;
    replayButton.hidden = true;
    message.textContent = "Ready? Time your click for the green zone.";
    updateScore();
}

shootButton.addEventListener("click", takeShot);
replayButton.addEventListener("click", playAgain);
updateScore();
            