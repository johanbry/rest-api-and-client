
function populatePlayer(player) {
    if (!player) {
        showMessage("Spelare kunde inte laddas in.", "alert-danger");
        document.getElementById("player").classList.add("d-none");
    }

    document.getElementById("first-name").textContent = player.firstName;
    document.getElementById("last-name").textContent = player.lastName;
    document.getElementById("number").textContent = `#${player.number}`;;
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

    document.getElementById("btn-edit").setAttribute("href", `editplayer.html?id=${player.id}`);

    document.getElementById("btn-delete-confirm").setAttribute("data-player-id", player.id);
}

async function init() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    await getPlayer(id)
    .then((player) => populatePlayer(player))
    .catch((err) => {
        showMessage("Spelare kunde inte laddas in. (" + err + ")", "alert-danger");
        document.getElementById("player").classList.add("d-none");
    });
}

const confirmModal = new bootstrap.Modal(document.getElementById("modal-delete-confirm"));

document.getElementById("btn-delete").addEventListener("click", () => {
    confirmModal.toggle();
});

document.getElementById("btn-delete-confirm").addEventListener("mouseup", async (ev) => {
    const id = ev.target.dataset.playerId;
    await deletePlayer(id)
    .then(() => window.location = "index.html")
    .catch((err) => {
        confirmModal.toggle();
        showMessage("Spelare kunde inte tas bort. (" + err + ")", "alert-danger");
    });
});

init();