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
        // sketchBlock.textContent = i; // test grid size by numbering each block
        sketchGrid.appendChild(sketchBlock);
    }


    // sketch/drawing functionality

    sketchBlocks = document.querySelectorAll('#sketchBlock');
    sketchBlocks.forEach((sketchBlock) => {
        sketchBlock.addEventListener('click', () => {
            let eraserToggle = document.getElementById('eraserToggle').checked;
            if (eraserToggle === false) {
                sketchBlock.style.backgroundColor = pencilColor; // 'var(--clr-bg-selected)';
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


// clear sketch grid color to default
const clearBtn = document.getElementById('clearBtn');

clearBtn.addEventListener('click', () => {
    sketchBlocks.forEach((sketchBlock) => {
        sketchBlock.style.backgroundColor = 'var(--clr-bg-default)';
    });
});



// run sketch grid sizing immediately on page load
gridResize();





