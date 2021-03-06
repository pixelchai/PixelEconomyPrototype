let c = document.querySelectorAll(".pixelart-canvas")[0];
let cWidth = 300;
let cHeight = 300;

let paletteSelectElement = document.querySelectorAll(".palette-select select")[0];
let paletteElement = document.querySelectorAll(".palette-select .palette")[0];

function draw() {

}

function start() {
    updateUI();
}

function updateUI() {
    // sizing
    c.height = c.offsetWidth;
    c.style.height = c.offsetWidth + "px";

    cWidth = c.offsetWidth;
    cHeight = c.offsetHeight;

    // palette dropdown
    loadPalettes();

    // redraw
    draw();
}

function loadPalettes() {
    // clear existing
    paletteSelectElement.innerHTML = '';


    // load combobox
    let palettes = pixelArtConfig["palettes"];
    let paletteKeys = Object.keys(palettes);

    for (let i = 0; i < paletteKeys.length; i++) {
        let paletteKey = paletteKeys[i];

        let optionElement = document.createElement("option");
        optionElement.innerText = paletteKey;

        paletteSelectElement.appendChild(optionElement);
    }

    paletteElement.style.width = cWidth - paletteSelectElement.offsetWidth - 5 + "px";
}

function loadPalette(paletteKey) {
    let colours = pixelArtConfig["palettes"][paletteKey];

    for (let i = 0; i < colours.length; i++) {

    }
}

(function () {
    window.addEventListener('resize', updateUI);
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".sidebar-toggle")[0].addEventListener("click", function () {
            let tickNo = 0;
            let routineId = setInterval(function () {
                updateUI();
                if (tickNo > 10) {
                    clearInterval(routineId);
                }
                tickNo++;
            }, 100)
        });
        start();
    });
})();