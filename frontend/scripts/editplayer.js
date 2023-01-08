import { getPlayer, updatePlayer } from "./playersApi.js";
import { showMessage } from "./message.js";

function collectFormData() {
    const id = document.querySelector("form").dataset.playerId;
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
        number: number.value
    }
    return player;
}

function populateFormData(player) {
    document.querySelector("form").setAttribute("data-player-id", player.id);
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

function setImage(player) {
    const image = document.getElementById("player-image");
    image.setAttribute("src", "http://localhost:3000/" + (player.image || "noimage.png"));
    image.setAttribute("alt", `${player.firstName} ${player.lastName}`);
}

async function init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    await getPlayer(id)
    .then((player) => populateFormData(player))
    .catch((err) => {
        showMessage("Spelare kunde inte laddas in. (" + err + ")", "alert-danger");
    });
}

const form = document.querySelector("form");

form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const updPlayer = collectFormData();
    const updImage = document.getElementById("image").files[0];
    await updatePlayer(updPlayer, updImage)
    .then((player) => {
        setImage(player);
        showMessage("Spelare har uppdaterats!", "alert-success");    
    })
    .catch((err) => showMessage("Spelare kunde inte sparas. (" + err + ")", "alert-danger"))
});

init();
    
    
    