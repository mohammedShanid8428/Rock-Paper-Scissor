function getComputerChoice() {
  choice = Math.floor(Math.random() * 3);
  return ['rock','paper','scissor'][choice];
}


const playerBtns   = document.querySelectorAll('[data-choice]');
const scorePlayer  = document.getElementById('player-score');
const scoreComputer= document.getElementById('computer-score');
const resultTxt    = document.getElementById('result');
const modal        = document.getElementById('gameModal');
const modalMsg     = document.getElementById('modalMsg');
const modalBtn     = document.getElementById('modalBtn');
const overlay      = document.getElementById('overlay');
const restartBtn   = document.getElementById('restartBtn');
// const rockBtn = document.getElementById("rock")
// const papperBtn = document.getElementById("paper")
// const scissorBtn = document.getElementById("scissor")

let humanScore    = 0;
let computerScore = 0;

playerBtns.forEach(btn =>
  btn.addEventListener('click', () => playRound(btn.dataset.choice))
);
restartBtn.addEventListener('click', resetGame);
overlay  .addEventListener('click', closeModal);

function playRound(humanChoice) {
  const compChoice   = getComputerChoice();

  const playerTile   = document.querySelector(`[data-choice="${humanChoice}"]`);
  const compTile     = document.getElementById(`comp-${compChoice}`);

  clearHighlights();

  if (humanChoice === compChoice) {
    resultTxt.textContent = "It's a draw";
    highlightBoth(playerTile, compTile, 'orange');
    return;                           // no score change
  }

  const youLose =
      (humanChoice === 'rock'    && compChoice === 'paper')   ||
      (humanChoice === 'paper'   && compChoice === 'scissor') ||
      (humanChoice === 'scissor' && compChoice === 'rock');

  if (youLose) {
    computerScore++;
    resultTxt.textContent = "You lose this round";
    highlightButtons(playerTile, compTile, 'red', 'green');
  } else {
    humanScore++;
    resultTxt.textContent = "You win this round";
    highlightButtons(playerTile, compTile, 'green', 'red');
  }

  updateScoreboard();
  checkForWinner();
}

function updateScoreboard() {
  scorePlayer.textContent   = `Score: ${humanScore}`;
  scoreComputer.textContent = `Score: ${computerScore}`;
}

function checkForWinner() {
  if (humanScore === 5 || computerScore === 5) {
    modalMsg.textContent =
      humanScore > computerScore ? 'You won!' : 'You lost...';
    openModal();
  }
}

/* =========  Highlight helpers  ========= */
function highlightButtons(pBtn, cBtn, pColor, cColor) {
  pBtn.style.backgroundColor = pColor;
  cBtn.style.backgroundColor = cColor;
  setTimeout(clearHighlights, 1200);
}

function highlightBoth(btn1, btn2, color) {
  btn1.style.backgroundColor = color;
  btn2.style.backgroundColor = color;
  setTimeout(clearHighlights, 1200);
}

function clearHighlights() {
  document.querySelectorAll('.game-selection').forEach(div => {
    div.style.backgroundColor = '';
  });
}

/* =========  Modal + Reset  ========= */
function openModal()  { modal.classList.add('active'); overlay.classList.add('active'); }
function closeModal() { modal.classList.remove('active'); overlay.classList.remove('active'); }

document.addEventListener('DOMContentLoaded',()=>openStartModal());

function openStartModal(){
  modalMsg.textContent='Rock Paper Scissor'
  modalBtn.textContent='Start Game';
  openModal();
}

modalBtn.addEventListener('click',()=>{
  resetGame();
  closeModal();
});

function showEndgameModal(didWin){
  modalMsg.textContent=didWin?"You won!":'You lost...';
  modalBtn.textContent='Play Again';
  openModal();
}

function checkForWinner(){
  if(humanScore===5) showEndgameModal(true);
  else if(computerScore===5) showEndgameModal(false);
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  updateScoreboard();
  resultTxt.textContent = 'Choose your weapon';
  clearHighlights();
  closeModal();
}

// rockBtn.addEventListener("click", () => getHumanChoice("rock"))
// papperBtn.addEventListener("click", () => getHumanChoice("paper"))
// scissorBtn.addEventListener("click", () => getHumanChoice("scissor"))
// restartBtn.addEventListener('click', resetGame);
// overlay.addEventListener('click', closeEndgameModal);

// function openEndgameModal(){
//   endgameModal.classList.add('active');
//   overlay.classList.add('active');
// }

// function closeEndgameModal(){
//   endgameModal.classList.remove('active');
//   overlay.classList.remove('active');
// }

// function setFinalMessage(){
//   return humanScore>computerScore
//   ?(endgameMsg.textContent='You won!'):(endgameMsg.textContent='You lost...');
// }

// function resetGames(){
//   humanScore=0;
//   computerScore=0;
//   resultTxt.textContent='Choose your weapon'
//   playerScoreUpdate.textContent='Score:0';
//   computerScoreUpdate.textContent='Score:0'
//   // endgameModal.classList.remove('active');
//   // overlay.classList.remove('active')
//   closeEndgameModal();
// }

// function getHumanChoice(humanSelection) {
//   const computerSelection = getComputerChoice();
//   return playRound(humanSelection, computerSelection)
// }


// let humanScore = 0;
// let computerScore = 0;
// let gameOver=false;

// function playRound(humanChoice, computerChoice) {
//   const playerBtn = document.getElementById(humanChoice);
//   const computerBtn = document.getElementById("comp-" + computerChoice);

//   // Clear previous highlights
//   clearHighlights();

//   if (humanChoice === computerChoice) {
//     resultTxt.textContent = "It's a Draw";
//     highlightBoth(playerBtn, computerBtn, "orange");
//   } else if (
//     (humanChoice === "rock" && computerChoice === "paper") ||
//     (humanChoice === "paper" && computerChoice === "scissor") ||
//     (humanChoice === "scissor" && computerChoice === "rock")
//   ) {
//     resultTxt.textContent = "You Lose this Round";
//     computerScore++;
//     highlightButtons(playerBtn, computerBtn, "red", "green");
//   } else {
//     resultTxt.textContent = "You Won this Round";
//     humanScore++;
//     highlightButtons(playerBtn, computerBtn, "green", "red");
//   }

//   playerScoreUpdate.textContent = "Score: " + humanScore;
//   computerScoreUpdate.textContent = "Score: " + computerScore;

//   if (humanScore === 5) {
//     resultTxt.textContent = `You Have Won The Game. Your Total Score is ${humanScore} to ${computerScore}, congratulations.`;
//     resetGame();
//     setFinalMessage();
//     openEndgameModal();

//   } else if (computerScore === 5) {
//     resultTxt.textContent = `You Have Lost The Game. Your Total Score is ${humanScore} to ${computerScore}, Better Luck Next Time.`;
//     resetGame();
//     setFinalMessage();
//     openEndgameModal();
//   }
// }
// if (humanScore === 5 || computerScore === 5) {
//   setFinalMessage();
//   openEndgameModal();
// }

// function highlightButtons(playerBtn, compBtn, playerColor, compColor) {
//   playerBtn.style.backgroundColor = playerColor;
//   compBtn.style.backgroundColor = compColor;

//   setTimeout(() => {
//     playerBtn.style.backgroundColor = "";
//     compBtn.style.backgroundColor = "";
//   }, 1500);
// }

// function highlightBoth(btn1, btn2, color) {
//   btn1.style.backgroundColor = color;
//   btn2.style.backgroundColor = color;

//   setTimeout(() => {
//     btn1.style.backgroundColor = "";
//     btn2.style.backgroundColor = "";
//   }, 1500);
// }

// function clearHighlights() {
//   const allBtns = document.querySelectorAll("button");
//   allBtns.forEach((btn) => {
//     btn.style.backgroundColor = "";
//   });
// }







// function resetGame() {
//   humanScore = 0;
//   computerScore = 0;
//   playerScoreUpdate.textContent = humanScore;
//   computerScoreUpdate.textContent = computerScore;
// }