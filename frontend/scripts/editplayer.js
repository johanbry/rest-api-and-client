import { getPlayer, updatePlayer } from "./playersApi.js";
import { showMessage } from "./message.js";


/**
 * Collects data from form to create a player object.
 * @returns {object} player
 */

function collectFormData() {
    const id = document.querySelector("form").dataset.playerId;
    const existingimage = document.querySelector("form").dataset.playerImage;
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
        id: id,
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
        number: number.value,
        image: existingimage
    }
    return player;
}


/**
 * Populates form with values of player.
 * @param {object} player 
 */

function populateFormData(player) {
    form.reset();

    document.querySelector("form").setAttribute("data-player-id", player.id);
    document.querySelector("form").setAttribute("data-player-image", player.image);
    document.getElementById("first-name").value = player.firstName;
    document.getElementById("last-name").value = player.lastName;
    document.getElementById("date-of-birth").value = player.dateOfBirth;
    document.getElementById("nationality").value = player.nationality;
    document.getElementById("youth-team").value = player.youthTeam;
    document.getElementById("shoots").value = player.shoots;
    document.getElementById("position").value = player.position;
    document.getElementById("height").value = player.height;
    document.getElementById("weight").value = player.weight;
    document.getElementById("team").value = player.team;
    document.getElementById("league").value = player.league;
    document.getElementById("number").value = player.number;

    setImage(player);
}


/**
 * Set image of the player.
 * @param {object} player 
 */

function setImage(player) {
    const image = document.getElementById("player-image");
    image.setAttribute("src", "http://localhost:3000/" + (player.image || "noimage.png"));
    image.setAttribute("alt", `${player.firstName} ${player.lastName}`);
}


/**
 * Initializes webpage.
 */

async function init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    await getPlayer(id)
    .then((player) => populateFormData(player))
    .catch((err) => {
        showMessage("Spelare kunde inte laddas in. (" + err + ")", "message-container", "alert-danger");
    });
}

const form = document.querySelector("form");

/**
 * Updates player on form submit.
 */

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const updPlayer = collectFormData();
    const updImage = document.getElementById("image").files[0];
    await updatePlayer(updPlayer, updImage)
    .then((player) => {
        showMessage("Spelare har uppdaterats!", "message-container", "alert-success");    
        setImage(player);
        populateFormData(player);
    })
    .catch((err) => showMessage("Ett fel uppstod. (" + err + ")", "message-container", "alert-danger"))
});

init(); 
    
    
    