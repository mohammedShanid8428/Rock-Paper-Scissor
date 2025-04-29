function getComputerChoice() {
  choice = Math.floor(Math.random() * 3 + 1);

  if (choice == 1) {
    return "rock"
  }
  else if (choice == 2) {
    return "papper"
  }
  if (choice == 3) {
    return "scissor"

  }
}

const rockBtn = document.getElementById("rock")
const papperBtn = document.getElementById("papper")
const scissorBtn = document.getElementById("scissor")
const playerScoreUpdate = document.getElementById("player-score")
const computerScoreUpdate = document.getElementById("computer-score")
const resultTxt = document.getElementById("result")

rockBtn.addEventListener("click", () => getHumanChoice("rock"))
papperBtn.addEventListener("click", () => getHumanChoice("papper"))
scissorBtn.addEventListener("click", () => getHumanChoice("scissor"))

function getHumanChoice(humanSelection) {
  const computerSelection = getComputerChoice();
  return playRound(humanSelection, computerSelection)
}


let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
  const playerBtn = document.getElementById(humanChoice);
  const computerBtn = document.getElementById("comp-" + computerChoice);

  // Clear previous highlights
  clearHighlights();

  if (humanChoice === computerChoice) {
    resultTxt.textContent = "It's a Draw";
    highlightBoth(playerBtn, computerBtn, "orange");
  } else if (
    (humanChoice === "rock" && computerChoice === "papper") ||
    (humanChoice === "papper" && computerChoice === "scissor") ||
    (humanChoice === "scissor" && computerChoice === "rock")
  ) {
    resultTxt.textContent = "You Lose this Round";
    computerScore++;
    highlightButtons(playerBtn, computerBtn, "red", "green");
  } else {
    resultTxt.textContent = "You Won this Round";
    humanScore++;
    highlightButtons(playerBtn, computerBtn, "green", "red");
  }

  playerScoreUpdate.textContent ="Score: "+ humanScore;
  computerScoreUpdate.textContent ="Score: "+ computerScore;

  if (humanScore === 5) {
    resultTxt.textContent = `You Have Won The Game. Your Total Score is ${humanScore} to ${computerScore}, congratulations.`;
    resetGame();
  } else if (computerScore === 5) {
    resultTxt.textContent = `You Have Lost The Game. Your Total Score is ${humanScore} to ${computerScore}, Better Luck Next Time.`;
    resetGame();
  }
}

function highlightButtons(playerBtn, compBtn, playerColor, compColor) {
  playerBtn.style.backgroundColor = playerColor;
  compBtn.style.backgroundColor = compColor;

  setTimeout(() => {
    playerBtn.style.backgroundColor = "";
    compBtn.style.backgroundColor = "";
  }, 1500);
}

function highlightBoth(btn1, btn2, color) {
  btn1.style.backgroundColor = color;
  btn2.style.backgroundColor = color;

  setTimeout(() => {
    btn1.style.backgroundColor = "";
    btn2.style.backgroundColor = "";
  }, 1500);
}

function clearHighlights() {
  const allBtns = document.querySelectorAll("button");
  allBtns.forEach((btn) => {
    btn.style.backgroundColor = "";
  });
}







function resetGame() {
  humanScore = 0;
  computerScore = 0;
  playerScoreUpdate.textContent = humanScore;
  computerScoreUpdate.textContent = computerScore;
}