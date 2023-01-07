const apiUrl = "http://localhost:3000/players/";

/**
 * Gets players from API.
 * @returns {array} Returns array with player objects (Promise).
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
 * Gets a player from API.
 * @param {string} id
 * @returns {object} Player object (Promise).
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
 * Deletes a player with API.
 * @param {string} id 
 * @returns {object} Response object (Promise)
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
 * Creates a player with API.
 * @param {object} player
 * @param {file} image
 * @returns {object} Player object created including id
 */

async function createPlayer(player, image) {
    try {
        const formData = new FormData();
        formData.append("data", JSON.stringify(player));
        if (image)
            formData.append("image", image);

        const response = await fetch(apiUrl, {
            method: 'POST',
            body: formData,
            headers: { }
        });

        if (!response.ok) {
            const error = new Error("Could not create player. Status code: " + response.status);
            throw error;
        }
        return player = await response.json(); 
    } catch (error) {
        throw error;
    }
}

/**
 * Updates a player with API.
 * @param {object} player
 * @param {file} image
 * @returns {object} Player object updated
 */

 async function updatePlayer(player, image) {
    try {
        const formData = new FormData();
        formData.append("data", JSON.stringify(player));
        if (image)
            formData.append("image", image);

        const response = await fetch(apiUrl + player.id, {
            method: 'PUT',
            body: formData,
            headers: { }
        });

        if (!response.ok) {
            const error = new Error("Could not update player. Status code: " + response.status);
            throw error;
        }
        return player = await response.json(); 
    } catch (error) {
        throw error;
    }
}


/**
 * Shows custom message on web page.
 * @param {string} message 
 * @param {string} [bsMessageType] Bootstrap alert message type.
 */

function showMessage(message, bsMessageType) {
    const alertDiv = document.createElement("div");
    alertDiv.setAttribute("role", "alert");
    alertDiv.classList.add("alert", bsMessageType || "alert-light", "mt-3", "mb-2");
    alertDiv.innerHTML = message;

    document.querySelector("main").appendChild(alertDiv);
}