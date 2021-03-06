const COL_BAKGROUND = "#FFFFFF";
const COL_GRID = "#000000";
const DIM = 16; // 16 x 16 pixel art

let c = document.querySelectorAll(".pixelart-canvas")[0];
let ctx = c.getContext("2d");
let cWidth = 300;
let cHeight = 300;

let paletteSelectElement = document.querySelectorAll(".palette-select select")[0];
let paletteElement = document.querySelectorAll(".palette-select .palette")[0];

let mouseX = -1;
let mouseY = -1;

function draw() {
    // background
    ctx.fillStyle = COL_BAKGROUND;
    ctx.rect(0, 0, cWidth, cHeight);
    ctx.fill();

    // draw grid
    ctx.strokeStyle = COL_GRID;
    ctx.setLineDash([1, 1]);
    let division = cWidth / DIM;
    for (let i = 0; i <= DIM; i++) {
        // horizontal
        ctx.beginPath();
        ctx.moveTo(0, i * division);
        ctx.lineTo(cWidth, i * division);
        ctx.stroke();

        // vertical
        ctx.beginPath();
        ctx.moveTo(i * division, 0);
        ctx.lineTo(i * division, cHeight);
        ctx.stroke();
    }
}

function start() {
    c.addEventListener('mousemove', function (evt) {
        let division = cWidth / DIM;
        var rect = c.getBoundingClientRect();

        mouseX = Math.floor((evt.clientX - rect.left) / division);
        mouseY = Math.floor((evt.clientY - rect.top) / division);
    });
    paletteSelectElement.addEventListener('change', function () {
        loadPalette(paletteSelectElement.value);
    });
    updateUI();

    // palette dropdown
    loadPalettes();

    // load first palette by default on first start
    loadPalette(Object.keys(pixelArtConfig["palettes"])[0]);

    // redraw
    draw();
}

function updateUI() {
    // sizing
    c.height = c.offsetWidth;
    c.style.height = c.offsetWidth + "px";

    cWidth = c.offsetWidth;
    cHeight = c.offsetHeight;

    // redraw
    draw();
}

function loadPalettes() {
    // clear existing
    paletteSelectElement.innerHTML = '';


    // load combobox
    let palettes = pixelArtConfig["palettes"];
    let paletteKeys = Object.keys(palettes);
    // let paletteKeys = Object.keys(pixelArtConfig["palettes"])[0];

    for (let i = 0; i < paletteKeys.length; i++) {
        let paletteKey = paletteKeys[i];

        let optionElement = document.createElement("option");
        optionElement.innerText = paletteKey;

        paletteSelectElement.appendChild(optionElement);
    }

    paletteElement.style.width = cWidth - paletteSelectElement.offsetWidth - 5 + "px";
}

function loadPalette(paletteKey) {
    // clear palette element
    paletteElement.innerHTML = "";

    // add colour elements
    let colours = pixelArtConfig["palettes"][paletteKey];

    for (let i = 0; i < colours.length; i++) {
        let colourElement = document.createElement("div");
        colourElement.classList.add("palette-color");
        colourElement.style.background = colours[i];
        paletteElement.appendChild(colourElement);
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