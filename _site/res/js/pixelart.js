let c = document.querySelectorAll(".pixelart-canvas")[0];
function draw() {

}

function start() {

}

(function () {
    start();

    function resizeCanvas() {
        c.width = window.innerWidth;
        c.height = window.innerHeight;

        draw();
    }
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();
})();