
async function getPlayers() {
    try {
        const response = await fetch("http://localhost:3000/players");
        const players = await response.json();
        return players;     
    } catch (error) {
        throw new Error('Något gick fel');
        // anropa funktion skriva ut fel
    }
}

function renderPlayers(players) {
    players.forEach(player => {
        document.createElement("div");
    });
}





async function init() {
    const players = await getPlayers();
    console.log(players);
    if (players) {
        renderPlayers(players);
    }

}

init();