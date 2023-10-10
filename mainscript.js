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


// Pencil color selection

// initial color
const pencilInput = document.getElementById('pencolor');
let pencilColor = pencilInput.value;

// // changing color
pencilInput.oninput = function() {
    pencilColor = this.value;
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
        sketchBlock.style.backgroundColor = '#ccc';
        sketchGrid.appendChild(sketchBlock);
    }


    // sketch/drawing functionality

    sketchBlocks = document.querySelectorAll('#sketchBlock');
    sketchBlocks.forEach((sketchBlock) => {
        sketchBlock.addEventListener('click', () => {
            let eraserToggle = document.getElementById('eraserToggle').checked;
            let darkenToggle = document.getElementById('darkenToggle').checked;
            let lightenToggle = document.getElementById('lightenToggle').checked;
            if (eraserToggle) {
                sketchBlock.style.backgroundColor = 'var(--clr-bg-eraser)';
            } 
            else if (darkenToggle) { // darken by 10%
                sketchBlock.style.backgroundColor = darkenLightenColor(sketchBlock, -25);
            }
            else if (lightenToggle) { //lighten by 10%
                sketchBlock.style.backgroundColor = darkenLightenColor(sketchBlock, 25);
            } 
            else {
                sketchBlock.style.backgroundColor = pencilColor;
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


// clear sketch grid color to default
const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
    sketchBlocks.forEach((sketchBlock) => {
        sketchBlock.style.backgroundColor = 'var(--clr-bg-default)';
    });
});


function darkenLightenColor(sketchBlock, amt) {
    // function takes in RGB color and returns HEX color

    let col = sketchBlock.style.backgroundColor;

    let rgbCol = col.split(',');

    // get r
    let rgbCol_r = rgbCol[0].split('(');
    rgbCol[0] = parseInt(rgbCol_r[1]) + amt;
    let r = rgbCol[0];
    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    // get g
    let rgbCol_g = rgbCol[1];
    rgbCol[1] = parseInt(rgbCol_g.slice(1)) + amt;
    let g = rgbCol[1];
    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    // get b
    let rgbCol_b = rgbCol[2];
    rgbCol[2] = parseInt(rgbCol_b.slice(1,-1)) + amt;
    let b = rgbCol[2];
    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    return "#" + (g | (b << 8) | (r << 16)).toString(16);
}


// run sketch grid sizing immediately on page load
gridResize();





