function newGrid() {
    const size = prompt("Enter a number between 1 and 100 for the grid size");
}

const gridContainer = document.getElementById("grid-container");
const gridSize = 16; // Default grid size

function createGrid(size) {
    gridContainer.innerHTML = ''; // Clear existing grid
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.addEventListener('mouseover', () => {
            cell.style.backgroundColor = 'black'; // Change color on hover
        });
        gridContainer.appendChild(cell);
    }
}

