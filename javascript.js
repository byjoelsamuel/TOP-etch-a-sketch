const gridSize = 16;

function randomColor() {
    return [0, 0, 0].map(() => Math.floor(Math.random() * 256));
}

function mixColors(colors) {
    return colors.reduce(
        (mixed, color) => mixed.map((value, index) => value + color[index]),
        [0, 0, 0]
    ).map(value => Math.round(value / colors.length));
}

function colorToString(color) {
    return `rgb(${color.join(', ')})`;
}

function getNeighborColors(cell, size) {
    const index = Number(cell.dataset.index);
    const row = Math.floor(index / size);
    const column = index % size;
    const neighbors = [];

    [
        row > 0 ? index - size : null,
        row < size - 1 ? index + size : null,
        column > 0 ? index - 1 : null,
        column < size - 1 ? index + 1 : null
    ].forEach(neighborIndex => {
        if (neighborIndex === null) return;

        const neighbor = cell.parentElement.children[neighborIndex];
        if (neighbor.dataset.color) {
            neighbors.push(JSON.parse(neighbor.dataset.color));
        }
    });

    return neighbors;
}

function colorCell(cell, size) {
    const neighborColors = getNeighborColors(cell, size);
    const color = neighborColors.length > 0
        ? mixColors([...neighborColors, randomColor()])
        : randomColor();

    cell.dataset.color = JSON.stringify(color);
    cell.style.backgroundColor = colorToString(color);
}

function createGrid(size) {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    gridContainer.style.display = 'grid';
    gridContainer.style.width = 'min(90vw, 600px)';
    gridContainer.style.aspectRatio = '1';
    gridContainer.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridContainer.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let index = 0; index < size * size; index += 1) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.index = index;
        cell.style.border = '1px solid #d9d9d9';
        cell.addEventListener('mouseenter', () => colorCell(cell, size));
        gridContainer.appendChild(cell);
    }
}

function resetGrid() {
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.dataset.color = '';
        cell.style.backgroundColor = '';
    });
}

function changeGridSize() {
    const value = prompt('Enter a new grid size (1-100):');
    const size = Number.parseInt(value, 10);

    if (Number.isNaN(size) || size < 1 || size > 100) {
        alert('Invalid size. Please enter a number between 1 and 100.');
        return;
    }

    createGrid(size);
}

function initialize() {
    createGrid(gridSize);
    document.getElementById('reset-button').addEventListener('click', resetGrid);
    document.getElementById('change-size-button').addEventListener('click', changeGridSize);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}

