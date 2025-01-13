let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container"); // Fixed: Changed to querySelector
let msg = document.querySelector("#msg");

let turnO = true; // 'O' starts first
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Add click functionality to boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        checkWinner(); // Check for winner after every click
    });
});

// Disable all boxes
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable all boxes and reset text
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false; // Fixed: Enable boxes
        box.innerText = ""; // Clear text
    }
};

// Display the winner
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Show message container
    disableBoxes(); // Disable further interaction
};

// Check for a winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val); // Call showWinner with the winning mark ('O' or 'X')
            return;
        }
    }
    // Check for draw
    if ([...boxes].every((box) => box.innerText !== "")) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
    }
};

// Reset the game
const resetGame = () => {
    turnO = true; // Reset turn to 'O'
    enableBoxes(); // Enable all boxes
    msgContainer.classList.add("hide"); // Hide message container
};

// Event listeners for buttons
newGameBtn.addEventListener("click", resetGame); // Fixed: Removed extra space in "click"
resetBtn.addEventListener("click", resetGame);
