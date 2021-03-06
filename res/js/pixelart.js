let c = document.querySelectorAll(".pixelart-canvas")[0];
function draw() {

}

function start() {

}

(function () {
    start();

    function resizeCanvas() {
        // c.width = c.offsetWidth;
        c.height = c.offsetWidth;
        c.style.height = c.offsetWidth + "px";

        draw();
    }
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
})();