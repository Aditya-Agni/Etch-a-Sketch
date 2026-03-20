let grids = document.querySelector('.container');
let input = document.querySelector('.input');
let size = parseInt(input.value);
let p= document.querySelector('p');
let create = () => {
    
    grids.style["grid-template-columns"] = `repeat(${size}, 1fr)`
    grids.style["grid-template-rows"] = `repeat(${size}, 1fr)`
    grids.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    for (i = 0; i < size * size; i++) {
        let cell = document.createElement('div')
        cell.classList.add('cell');
        grids.appendChild(cell);
    }
    p.textContent=`Grid Size: ${size} x ${size}`;
    
}
create();

input.addEventListener('input', (event) => {
    if (event.target.classList.contains('input')) {
        size = parseInt(event.target.value);
        console.log(size)

        grids.innerHTML = '';

        create();
    }
})
let colorPicker = document.querySelector('.color-picker')
let colorBtn = document.querySelector('.color-btn')
colorBtn.addEventListener('click', (event) => {
    colorPicker.click();
})
let erase = document.querySelector('.erase')
let currentMode = colorPicker;
let isDrawing = false

colorPicker.addEventListener('click', (event) => {
    currentMode = colorPicker
})

let bucket = document.querySelector('.fill');
bucket.addEventListener('click', (event) => {
    currentMode = bucket;
}); 

erase.addEventListener('click', (event) => {
    currentMode = erase
})

let rainbow = document.querySelector('.rainbow');
rainbow.addEventListener('click', (event) => {
    currentMode = 'rainbow'
})

grids.addEventListener('mousedown', (event) => {

    if (event.target.classList.contains('cell')) {
        isDrawing = true;
        event.preventDefault();
        if (currentMode === colorPicker) {
            event.target.classList.add('color-picker');
            event.target.style["background-color"] = colorPicker.value;
            event.target.style["border"]="transparent "
        }

        else if(currentMode === bucket) {
            const allCells = Array.from(document.querySelectorAll('.cell'));
            const clickedIndex = allCells.indexOf(event.target);
            
            floodFill(clickedIndex, colorPicker.value);
        }

        else if (currentMode === 'rainbow') {
            const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            event.target.classList.add('color-picker');
            event.target.style["background-color"] = randomColor;
            event.target.style["border"]="transparent "
        }

        else {
            event.target.classList.remove('color-picker');
            event.target.style["background-color"] = "white";
            event.target.style["border"]="black 1px solid";
        }
        console.log("cell clicked");
    }
})

grids.addEventListener('mouseover', (event) => {
    if (isDrawing === true && event.target.classList.contains('cell')) {
        if (currentMode === colorPicker) {
            event.target.classList.add('color-picker');
            event.target.style["background-color"] = colorPicker.value;
            event.target.style["border"]="transparent "
        }

        else if (currentMode === 'rainbow') {
            const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            event.target.classList.add('color-picker');
            event.target.style["background-color"] = randomColor;
            event.target.style["border"]="transparent "
        }

        else {
            event.target.classList.remove('color-picker');
            event.target.style["background-color"] = "white";
            event.target.style["border"]="black 1px solid"
        }
    }
})

addEventListener('mouseup', (event) => {
    isDrawing = false;
})

grids.addEventListener('touchstart', (event)=>{

    if (event.target.classList.contains('cell')) {
        isDrawing = true;
        event.preventDefault();
        if (currentMode === colorPicker) {
            event.target.classList.add('color-picker');
            event.target.style["background-color"] = colorPicker.value;
            event.target.style["border"]="transparent "
        }
        else {
            event.target.classList.remove('color-picker');
            event.target.style["background-color"] = "white";
            event.target.style["border"]="black 1px solid";
        }
        
        console.log("cell clicked");
    }
})

grids.addEventListener('touchmove', (event)=>{
    let touch= event.touches[0];
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    
    
    if (target && target.classList.contains('cell')) {
        if (currentMode === colorPicker) {
            target.classList.add('color-picker');
            target.style["background-color"] = colorPicker.value;
            target.style["border"]="transparent "
        }

        else if (currentMode === 'rainbow') {
            const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            target.classList.add('color-picker');
            target.style["background-color"] = randomColor;
            target.style["border"]="transparent "
        }

        else if (currentMode === bucket) {
            const allCells = Array.from(document.querySelectorAll('.cell'));
            const clickedIndex = allCells.indexOf(target);
            floodFill(clickedIndex, colorPicker.value);
        }

        else {
            target.classList.remove('color-picker');
            target.style["background-color"] = "white";
            target.style["border"]="black 1px solid"
        }
    }
})

addEventListener('touchend', (event) => {
    isDrawing = false;
})

let clear = document.querySelector('.clear')

clear.addEventListener( 'click',(event)=>{
    grids.innerHTML='';
    create();
})

 


const floodFill = (cellIndex, targetColor) => {
    const allCells = Array.from(document.querySelectorAll('.cell'));
    const cell = allCells[cellIndex];

    if (!cell || cell.classList.contains('color-picker')) return;

    cell.classList.add('color-picker');
    cell.style.backgroundColor = targetColor;
    cell.style.border = 'transparent';

    const row = Math.floor(cellIndex / size);
    const col = cellIndex % size;

    if (row > 0) floodFill(cellIndex - size, targetColor);
    if (row < size - 1) floodFill(cellIndex + size, targetColor);
    if (col > 0) floodFill(cellIndex - 1, targetColor);
    if (col < size - 1) floodFill(cellIndex + 1, targetColor);
};

document.querySelectorAll('.tools button').forEach(btn => {
    btn.addEventListener('click', () => {
        if (window.innerWidth <= 800) {
            if (!btn.classList.contains('color-btn')) {
                document.getElementById('dropdown').checked = false;
            }
        }
    });
});