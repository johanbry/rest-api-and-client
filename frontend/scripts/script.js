const apiUrl = "http://localhost:3000/players/";

/**
 * function getPlayers
 * @returns array with player objects (Promise)
 */

 async function getPlayers() {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            const error = new Error("Could not get data. Status code: " + response.status);
            throw error;
        }
        const players = await response.json();
        return players;
    } catch (error) {
        throw error;
    }
}

/**
 * function getPlayer
 * @param {*} id 
 * @returns player object (Promise)
 */

async function getPlayer(id) {
    try {
        const response = await fetch(apiUrl + id);

        if (!response.ok) {
            const error = new Error("Could not get data. Status code: " + response.status);
            throw error;
        }
        return player = await response.json(); 
    } catch (error) {
        throw error;
    }
}

/**
 * function deletePlayer
 * @param {*} id 
 * @returns response (Promise)
 */

async function deletePlayer(id) {
    try {
       const response = await fetch(apiUrl+ id, {method: "DELETE"});

       if (!response.ok) {
           const error = new Error("Could not delete. Status code: " + response.status);
           throw error;
       }
       return response;
   } catch(error) {
       throw error;
   } 
}

/**
 * 
 * @param {*} message 
 * @param {*} bsMessageType (optional)
 */

function showMessage(message, bsMessageType) {
    const alertDiv = document.createElement("div");
    alertDiv.setAttribute("role", "alert");
    alertDiv.classList.add("alert", bsMessageType || "alert-light", "mt-3", "mb-2");
    alertDiv.innerHTML = message;

    document.querySelector("main").appendChild(alertDiv);
}