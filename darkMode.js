/* 
    Claudia Catot, Daniel Shapoval, Jefrey Hernandez
    04/05/2023
    ASIXc1A M05 UF3
    roulette.js
    Codi javascript per l'implementació del mode foscor
*/

function toggleDarkMode() {
    var body = document.querySelector("body");
    body.classList.toggle("dark-mode");
    body.style.transition = ".2s";
    var modeButton = document.getElementById("darkMode");

    if (body.classList.contains("dark-mode")) {
        modeButton.innerText = "☀️";
    } else {
        modeButton.innerText = "🌑";
    }
}