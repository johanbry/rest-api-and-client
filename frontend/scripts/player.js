
async function loadPlayer(id) {
    try {
        const response = await fetch("http://localhost:3000/players/" + id);

        if (!response.ok) {
            const error = new Error("Could not get data. Status code: " + response.status);
            throw error;
        }
        const player = await response.json();
        renderPlayer(player);  
    } catch (error) {
        console.log(error);
        //renderErrorMessage(???);
    }
}

function renderPlayer(player) {

    const wrapper = document.getElementById("cards-wrapper");

    if (!player) {
        const div = document.createElement("div");
        div.innerHTML = "Ingen spelare hittades";
        wrapper.appendChild(div);
        return;
    }

    document.getElementById("first-name").textContent = player.firstName;
    document.getElementById("last-name").textContent = player.lastName;
    document.getElementById("team").textContent = player.team;
    document.getElementById("league").textContent = player.league;
    document.getElementById("position").textContent = player.position;
    document.getElementById("shoots").textContent = player.shoots;
    document.getElementById("nationality").textContent = player.nationality;
    document.getElementById("youth-team").textContent = player.youthTeam;
    document.getElementById("height").textContent = `${player.height} cm`;
    document.getElementById("weight").textContent = `${player.height} kg`;
    document.getElementById("date-of-birth").textContent = player.dateOfBirth;

    const dob = new Date(player.dateOfBirth);
    const now = Date.now();
    const age = Math.floor((now - dob) / 1000 / 60 / 60 / 24 / 365);
    document.getElementById("age").textContent = `${age} år`;
    
    const image = document.getElementById("player-image");
    image.setAttribute("src", "http://localhost:3000/" + (player.image || "noimage.png"));
    image.setAttribute("alt", `${player.firstName} ${player.lastName}`);

    const editBtn = document.getElementById("btn-edit");
    editBtn.setAttribute("href", `addedit.html${player.id}`);
}

function init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    loadPlayer(id);
}

document.getElementById("btn-delete").addEventListener("click", () => {

});



init();