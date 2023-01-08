import { getPlayers } from "./playersApi.js";
import { showMessage } from "./message.js";


/**
 * Renders players on webpage.
 * @param {object} players 
 */

function renderPlayers(players) {

    const wrapper = document.getElementById("cards-wrapper");

    if (!players || players.length === 0) {
        showMessage("Spelare kunde inte laddas in. (" + err + ")", "message-container", "alert-light");
    }

    const container = document.createElement("div");
    container.classList.add("row", "row-cols-1", "row-cols-sm-2", "row-cols-md-3", "row-cols-lg-4", "g-4", "d-flex", "justify-content-center");

    players.forEach(player => {
        const div1 = document.createElement("div");
        div1.classList.add("col");

        const div2 = document.createElement("div");
        div2.classList.add("card", "h-100");

        div1.appendChild(div2);

        const playerName = document.createElement("h5");
        playerName.classList.add("card-header", "text-center");
        playerName.innerText = player.firstName + " " + player.lastName;

        div2.appendChild(playerName);

        const img = document.createElement("img");
        img.setAttribute("src", "http://localhost:3000/" + (player.image || "noimage.png"));
        img.setAttribute("alt", player.firstName + " " + player.lastName);
        img.classList.add("card-img-top");

        div2.appendChild(img);

        const div3 = document.createElement("div");
        div3.classList.add("card-body");

        div2.appendChild(div3);

        const ul = document.createElement("ul");
        ul.classList.add("list-group", "list-group-flush");

        const liPos = document.createElement("li");
        liPos.classList.add("list-group-item");
        liPos.innerHTML = player.position;

        const liTeam = document.createElement("li");
        liTeam.classList.add("list-group-item");
        liTeam.innerHTML = "<strong>" + player.team + "</strong> " + player.league; 
        
        const liDOB = document.createElement("li");
        liDOB.classList.add("list-group-item");
        liDOB.innerHTML = "<strong>Född:</strong> " + player.dateOfBirth; 

        ul.append(liPos, liTeam, liDOB);

        div3.appendChild(ul);

        const div4 = document.createElement("div");
        div4.classList.add("card-footer", "d-flex", "justify-content-center");

        div2.appendChild(div4)

        const btn = document.createElement("a");
        btn.setAttribute("href", "player.html?id=" + player.id);
        btn.classList.add("btn", "btn-outline-dark");
        btn.textContent = "Mer info";

        div4.appendChild(btn);

        container.appendChild(div1);

        wrapper.appendChild(container);
    });
}

/**
 * Initializes webpage to render content.
 */

async function init() {
    await getPlayers()
    .then((players) => renderPlayers(players))
    .catch((err) => {
        showMessage("Spelare kunde inte laddas in. (" + err + ")", "message-container", "alert-danger");
    });
}

init();