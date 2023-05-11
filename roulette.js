/* 
    Claudia Catot, Daniel Shapoval, Jefrey Hernandez
    04/05/2023
    ASIXc1A M05 UF3
    roulette.js
    Codi javascript per al moviment i effectes de la ruleta
*/

let canvas = document.getElementById("idcanvas");
let context = canvas.getContext("2d");
let center = canvas.width / 2
let colors = ["#FFFFFF", "#FF99CC"]
let ruleData = [];

fetch("data.json")
    .then((response) => response.json())
    .then((dataList) => {
        ruleData = dataList.sortData;
        createRoulette(ruleData);
    })


function createRoulette(data) {
    // Forma quesito
    for (var i = 0; i < data.length; i++) {
        context.beginPath();
        context.moveTo(center, center);
        context.arc(center, center, center - 20, i * 2 * Math.PI / data.length,
            (i + 1) * 2 * Math.PI / data.length);
        context.lineTo(center, center)
        if (i % 2 == 0) {
            context.fillStyle = colors[0]
        } else {
            context.fillStyle = colors[1]
        }
        context.fill();

        // Insertar nombres
        context.save()
        context.translate(center, center);
        context.rotate(3 * 2 * Math.PI / (5 * data.length) + i * 2 * Math.PI / data.length);
        context.translate(-center, -center);
        context.font="13px Sans Serif";
        context.textAlign="right";
        context.fillStyle="black"
        context.fillText(data[i], canvas.width - 30, center);
        context.restore();
    }
}

function sort() {
    let audio = new Audio("SpinWheel.mp3");
    audio.play();
    document.querySelector("button").disabled = true;
    degrees = Math.round(Math.random() * 2000);
    canvas.style.transition = "9s";
    canvas.style.transform = `rotate(${Math.abs(degrees)}deg)`;
    setTimeout(() => {
        let winningSector = Math.floor((360 - degrees % 360) / (360 / ruleData.length));
        document.getElementById("winner").innerText = ruleData[winningSector];
        document.querySelector("button").disabled = false;
    }, 9000);
}