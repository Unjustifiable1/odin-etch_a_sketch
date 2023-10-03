const gridSize = 3;
const r = document.querySelector(':root');
r.style.setProperty('--grid-size', gridSize);


const sketchGrid = document.querySelector("#sketchGrid");

// resize grid
function gridResize() {
    for (let i = 1; i <= gridSize * gridSize; i++) {
        const sketchBlock = document.createElement('div');
        sketchBlock.setAttribute('id', 'sketchBlock');
        sketchBlock.textContent = i;
        sketchGrid.appendChild(sketchBlock);
    }
}

gridResize();