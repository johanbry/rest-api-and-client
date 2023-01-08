const apiUrl = "http://localhost:3000/players/";

/**
 * Gets players from API.
 * @returns {array} Returns array with player objects (Promise).
 */

 export async function getPlayers() {
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

export async function getPlayer(id) {
    try {
        const response = await fetch(apiUrl + id);

        if (!response.ok) {
            const error = new Error("Could not get data. Status code: " + response.status);
            throw error;
        }
        const player = await response.json();
        return player; 
    } catch (error) {
        throw error;
    }
}

/**
 * Deletes a player with API.
 * @param {string} id 
 * @returns {object} Response object (Promise)
 */

export async function deletePlayer(id) {
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

export async function createPlayer(player, image) {
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

 export async function updatePlayer(player, image) {
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