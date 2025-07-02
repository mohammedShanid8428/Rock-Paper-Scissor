/* =======  GLOBAL STATE  ======= */
let humanScore = 0;
let computerScore = 0;

/* =======  DOM REFERENCES  ======= */
const resultTxt        = document.getElementById('result');
const scorePlayer      = document.getElementById('player-score');
const scoreComputer    = document.getElementById('computer-score');

const playerTiles      = document.querySelectorAll('.game-selection[data-choice]');
const compTiles        = {          // quick lookup for “comp‑rock” etc.
  rock:    document.getElementById('comp-rock'),
  paper:   document.getElementById('comp-paper'),
  scissor: document.getElementById('comp-scissor')
};

const modal            = document.getElementById('gameModal');
const modalMsg         = document.getElementById('modalMsg');
const modalBtn         = document.getElementById('modalBtn');
const overlay          = document.getElementById('overlay');

/* =======  INITIAL MODAL  ======= */
window.addEventListener('DOMContentLoaded', openStartModal);

/* =======  EVENT WIRING  ======= */
playerTiles.forEach(tile =>
  tile.addEventListener('click', () => handleRound(tile.dataset.choice))
);

modalBtn.addEventListener('click', () => {
  resetGame();
  closeModal();
});

overlay.addEventListener('click', closeModal);

/* =======  GAME CORE  ======= */
function handleRound(humanChoice) {
  const compChoice = getComputerChoice();

  clearHighlights();
  highlightTiles(humanChoice, compChoice);

  if (humanChoice === compChoice) {
    resultTxt.textContent = "It's a Draw";
  } else if (isPlayerLoser(humanChoice, compChoice)) {
    computerScore++;
    resultTxt.textContent = "You Lose this Round";
  } else {
    humanScore++;
    resultTxt.textContent = "You Win this Round";
  }

  updateScoreboard();
  checkGameEnd();
}

function getComputerChoice() {
  const choices = ['rock', 'paper', 'scissor'];
  return choices[Math.floor(Math.random() * choices.length)];
}

function isPlayerLoser(player, comp) {
  return (
    (player === 'rock'    && comp === 'paper')   ||
    (player === 'paper'   && comp === 'scissor') ||
    (player === 'scissor' && comp === 'rock')
  );
}

/* =======  UI HELPERS  ======= */
function highlightTiles(playerChoice, compChoice) {
  const playerTile = document.querySelector(`.game-selection[data-choice="${playerChoice}"]`);
  const compTile   = compTiles[compChoice];

  const same = playerChoice === compChoice;
  const pClr = same ? 'orange' : (isPlayerLoser(playerChoice, compChoice) ? 'red'  : 'green');
  const cClr = same ? 'orange' : (isPlayerLoser(playerChoice, compChoice) ? 'green': 'red');

  playerTile.style.backgroundColor = pClr;
  compTile  .style.backgroundColor = cClr;

  setTimeout(clearHighlights, 1000);
}

function clearHighlights() {
  document.querySelectorAll('.game-selection').forEach(div => {
    div.style.backgroundColor = '';
  });
}

function updateScoreboard() {
  scorePlayer .textContent = `Score: ${humanScore}`;
  scoreComputer.textContent = `Score: ${computerScore}`;
}

/* =======  END‑GAME & MODAL  ======= */
function checkGameEnd() {
  if (humanScore === 5 || computerScore === 5) {
    const win = humanScore > computerScore;
    modalMsg.textContent = win ? 'You Won!' : 'You Lost…';
    modalBtn.textContent = 'Play Again';
    openModal();
  }
}

function openStartModal() {
  modalMsg.textContent = 'Rock Paper Scissors';
  modalBtn.textContent = 'Start Game';
  openModal();
}

function openModal()  { modal.classList.add('active'); overlay.classList.add('active'); }
function closeModal() { modal.classList.remove('active'); overlay.classList.remove('active'); }

/* =======  RESET  ======= */
function resetGame() {
  humanScore = 0;
  computerScore = 0;
  updateScoreboard();
  resultTxt.textContent = 'Choose your weapon';
  clearHighlights();
}
