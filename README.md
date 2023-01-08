# Rest API med klientgränssnitt (Inlämningsuppgift)

Rest API skapat med Node.js och Express samt ett fristående klientgränssnitt.
Resursen är en hockeyspelardatabas.
Projektet är en inlämningsuppgift i kursen Systemutveckling på Medieinstitutet.

## Detaljbeskrivning

Rest API är skapat med Node.js och Express. Resursen är en hockeyspelardatabas där varje spelare har ett antal egenskaper. Till varje spelare hör också en bild som kan laddas upp via endpoints:en POST och PUT till mappen "uploads".
Klientgränssnittet är gjort med HTML, CSS, Bootstrap och Javascript.
Man kan se en översikt av alla spelare, se en spelare i detalj, uppdatera och ta bort spelare.

## Uppfyllda krav

- Innehåller endpoints för att hämta ett eller alla objekt (GET), radera ett eller alla objekt (DELETE), skapa ett nytt objekt (POST) samt uppdatera ett objekt (PUT).
- Datan sparas i en JSON-fil (data/players.json).
- JSON-filen uppdateras vid anrop till API:et.
- Om data/objekt saknas vid anrop svaras det med statuskod 404.
- En REST Client-fil (requests.rest) har skapats för att testa anrop.
- Ett klientgränssnitt har skapats som använder endpoints:en. Vid redigering av data är formulär förifyllt med befintlig information.
- Git & GitHub har använts.
- README.md-fil finns

## Köra och testa projektet

### Starta server

- Klona eller spara ner projektet.
- I terminalen gå till projetets mapp och skriv "npm install" för att installera dependencies.
- Skriv "npm start" (nodemon) eller "node index.js" för att starta servern.

### Testa endpoints

- Filen requests.rest innehåller API-anrop för att testa endpoints med hjälp av VS Code REST Client. (bildfil som används vid POST och PUT finns i projektmappen.)

### Klientgränssnitt

I mappen "frontend" finns klientgränssnittet.

- Öppna "index.html" med Live Server (VS Code).
- Observera att Live Server gör att webbsidan laddas om när man skapar ny eller uppdaterar spelare om man inte anger i Live Servers inställningar att ignorera "uploads-mappen" och "data/players.json". I detta repo följer ".vscode/settings.json" med för att förhindra detta.
