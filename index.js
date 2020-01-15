let colors = _generateRandomColors(6);
let squares = document.querySelectorAll(".square");
let pickedColor = _pickColor();
let colorDisplay = document.getElementById("colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let easyBtn = document.querySelector("#easyBtn");
let hardBtn = document.querySelector("#hardBtn");
let mode = 6;

easyBtn.addEventListener("click", function () {
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    mode = 3;
    _regenerateColors(mode);
})

hardBtn.addEventListener("click", function () {
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    mode = 6;
    _regenerateColors(mode);
})

resetButton.addEventListener("click", function () {
    _regenerateColors(mode);
    resetButton.textContent = "New Colors";
})

function _regenerateColors(numberOfColors) {
    colors = _generateRandomColors(numberOfColors);
    pickedColor = _pickColor();
    colorDisplay.textContent = pickedColor;

    for (let i = 0; i < squares.length; i++) {
        if (i < colors.length) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        } else {
            squares[i].style.display = "none";
        }
    }

    messageDisplay.textContent = "";
    h1.style.backgroundColor = "steelblue";
}

colorDisplay.textContent = pickedColor;

for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener("click", function () {
        let squareColor = this.style.backgroundColor;

        if (squareColor === pickedColor) {
            messageDisplay.textContent = "Correct!";
            h1.style.backgroundColor = pickedColor;
            resetButton.textContent = "Play Again?";
            _changeColors(squareColor);
        } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    })
}

function _changeColors(color) {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function _pickColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function _generateRandomColors(num) {
    let colorArray = [];

    for (let i = 0; i < num; i++) {
        colorArray.push(_randomColor());
    }

    return colorArray;
}

function _randomColor() {
    let red = Math.floor(Math.random() * 256);
    let green = Math.floor(Math.random() * 256);
    let blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}