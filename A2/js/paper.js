let gameState = [];
let currentPlayer = 1;
let movesLeft = 2;
let lastIndex = -1;

function askGameSize() {
    document.getElementById("game").style.display = "none";
    document.getElementById("gamesize").style.display = "";
}

function startGame(event) {
    const n = event.target.n.value;

    document.getElementById("gamesize").style.display = "none";

    buildGame(n);

    document.getElementById("game").style.display = "";

    // stop the browser from refreshing the page after form submit
    return false;
}

function buildGame(n) {
    const game = document.getElementById("game");
    game.innerHTML = "";

    let messages = document.createElement("div");
    messages.id = "messages";
    messages.innerHTML = "<span id='playername' class='p1'>Player <span id='playernumber'>1</span></span>'s turn. <span id='turns'>2 clicks</span> remaining.";
    game.appendChild(messages);

    let errorMessage = document.createElement("div");
    errorMessage.id = "errorMessage";
    game.appendChild(errorMessage);

    let squares = document.createElement("div");
    squares.id = "squares";
    game.appendChild(squares);

    gameState = [];

    for (let i = 0; i < n; i++) {
        let square = document.createElement("div");
        square.className = "square";
        square.onclick = () => { squareClicked(square, i); };

        squares.appendChild(square);
        gameState.push(0);
    }

    setTurn(1);
}

function squareClicked(square, i) {
    if (gameState[i] !== 0) {
        showError("That square is already taken, please choose another.");
        return;
    }

    if (lastIndex !== -1 && Math.abs(i - lastIndex) !== 1) {
        showError("You must choose a square adjacent to your last square.");
        return;
    }

    if (lastIndex === -1 && getSquareValue(i - 1) !== 0 && getSquareValue(i + 1) !== 0) {
        showError("That square can't be chosen because there is no adjacent square free.");
        return;
    }

    square.classList.add("p" + currentPlayer);
    gameState[i] = currentPlayer;
    lastIndex = i;
    movesLeft--;

    if (movesLeft == 0) {
        setTurn(getOtherPlayer());
    }
    else {
        const turns = document.getElementById("turns");
        turns.innerText = movesLeft + " click" + (movesLeft != 1 ? "s" : "");
    }
}

function getSquareValue(i) {
    if (i < 0 || i >= gameState.length) return -1;

    return gameState[i];
}

function showError(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "";
    errorMessage.innerText = message;
}

function checkForWinner() {
    for (let i = 0; i < gameState.length - 1; i++) {
        // game is still possible since 2 adjacent squares
        if (gameState[i] === 0 && gameState[i + 1] === 0)
            return;
    }

    // no adjacent squares were found, other player won
    setWinner(getOtherPlayer());
}

function getOtherPlayer() {
    if (currentPlayer == 1) return 2;
    return 1;
}

function setTurn(player) {
    currentPlayer = player;
    movesLeft = 2;
    lastIndex = -1;

    const playerName = document.getElementById("playername");
    playerName.className = "p" + currentPlayer;

    const playerNumber = document.getElementById("playernumber");
    playerNumber.innerText = currentPlayer;

    const turns = document.getElementById("turns");
    turns.innerText = movesLeft + " click" + (movesLeft != 1 ? "s" : "");

    const errorMessage = document.getElementById("errorMessage");
    errorMessage.style.display = "none";

    checkForWinner();
}

function setWinner(player) {
    const messages = document.getElementById("messages");
    messages.innerHTML = "<span class='p" + player + "'>Player " + player + "</span> has won. <button onclick='askGameSize()'>Play again?</button>";
}


window.addEventListener("load", function () {
    askGameSize();
});