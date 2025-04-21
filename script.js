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
  if (humanChoice == computerChoice) {
    resultTxt.textContent = "its a Draw"
  }
  else if (
    (humanChoice == "rock" && computerChoice == "papper") ||
    (humanChoice == "papper" && computerChoice == "scissor") ||
    (humanChoice == "scissor" && computerChoice == "rock")) {
    resultTxt.textContent = "You Lose this Round";
    computerScore++;
    playerScoreUpdate.textContent = humanScore;
    computerScoreUpdate.textContent = computerScore;

  }
  else if (
    (humanChoice == "rock" && computerChoice == "scissor") ||
    (humanChoice == "papper" && computerChoice == "rock") ||
    (humanChoice == "scissor" && computerChoice == "papper")){
      resultTxt.textContent = "You Won this Round";
      humanScore++;
      playerScoreUpdate.textContent = humanScore;
      computerScoreUpdate.textContent = computerScore;
  
    }
    
//to check if player has won this game//
    if (humanScore == 5) {
      resultTxt.textContent = "You Have Won The Game. Your Total Score is " + humanScore + " to " + computerScore + " ,congragulations.";
      resetGame();
    }
    else if (computerScore == 5) {
      resultTxt.textContent = "You Have LOst The Game. Your Total Score is " + humanScore + " to " + computerScore + " ,Better Luck Next TIme.";
      resetGame()
    }
   
  
}




function resetGame() {
  humanScore = 0;
  computerScore = 0;
  playerScoreUpdate.textContent = humanScore;
  computerScoreUpdate.textContent = computerScore;
}