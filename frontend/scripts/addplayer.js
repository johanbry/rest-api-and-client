import { createPlayer } from "./playersApi.js";
import { showMessage } from "./message.js";


/**
 * Collects values from form to create a player object.
 * @returns {object} player
 */

function collectFormData() {
    const firstName = document.getElementById("first-name");
    const lastName = document.getElementById("last-name");
    const dateOfBirth = document.getElementById("date-of-birth");
    const nationality = document.getElementById("nationality");
    const youthTeam = document.getElementById("youth-team");
    const shoots = document.getElementById("shoots");
    const position = document.getElementById("position");
    const height = document.getElementById("height");
    const weight = document.getElementById("weight");
    const team = document.getElementById("team");
    const league = document.getElementById("league");
    const number = document.getElementById("number");

    const player =
    {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: dateOfBirth.value,
        nationality: nationality.value,
        youthTeam: youthTeam.value,
        shoots: shoots.value,
        position: position.value,
        height: height.value,
        weight: weight.value,
        team: team.value,
        league: league.value,
        number: number.value
    }
    return player;
}

const form = document.querySelector("form");

/**
 * Creates player on form submit.
 */

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const player = collectFormData();
    const image = document.getElementById("image").files[0];
    console.log(player);
    console.log(image);
    await createPlayer(player, image)
    .then((player) => {
        window.location = "player.html?id=" + player.id;
    })
    .catch((err) => showMessage("Spelare kunde inte sparas. (" + err + ")", "message-container", "alert-danger"))
});
    
    
    