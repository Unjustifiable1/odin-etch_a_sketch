// Set grid size with slider
const gridSlider = document.getElementById('gridSize');
const output = document.getElementById('gridValue');
let gridSize = gridSlider.value;
output.innerHTML = gridSize + " x " + gridSize;

gridSlider.oninput = function() {
    gridSize = this.value;
    output.innerHTML = gridSize + " x " + gridSize;
    gridResize();
}


// resize sketch grid
const r = document.querySelector(':root');
const sketchGrid = document.querySelector("#sketchGrid");
let sketchBlocks = "";

function gridResize() {
    removeSketchGrid();
    r.style.setProperty('--grid-size', gridSize);
    for (let i = 1; i <= gridSize * gridSize; i++) {
        const sketchBlock = document.createElement('div');
        sketchBlock.setAttribute('id', 'sketchBlock');
        // sketchBlock.textContent = i; // test grid size by numbering each block
        sketchGrid.appendChild(sketchBlock);
    }


    // sketch/drawing functionality

    sketchBlocks = document.querySelectorAll('#sketchBlock');
    sketchBlocks.forEach((sketchBlock) => {
        sketchBlock.addEventListener('click', () => {
            let eraserToggle = document.getElementById('eraserToggle').checked;
            console.log(eraserToggle);
            if (eraserToggle === false) {
                sketchBlock.style.backgroundColor = 'var(--clr-bg-selected)';
            } else {
                sketchBlock.style.backgroundColor = 'var(--clr-bg-eraser)';
            }
        });
    });
}


// remove sketch grid divs
function removeSketchGrid() {
    let child = sketchGrid.lastElementChild;
    while (child) {
        sketchGrid.removeChild(child);
        child = sketchGrid.lastElementChild;
    }
}


// run sketch grid sizing immediately on page load
gridResize();





