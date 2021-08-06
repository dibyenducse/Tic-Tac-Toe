const statusDisplay = document.querySelector('.game--status');

document.querySelectorAll('.cell').forEach(cell=>cell.addEventListener('click',handleCellClick));
document.querySelector('.game--restart').addEventListener('click',handleRestartGame);


let gameActive = true;
let currentPlayer = "X";
//We will store our current game state here, the form of empty strings in an array
 //will allow us to easily track played cells and validate the game state later on

let gameState =["", "", "", "", "", "", "", "", ""];

const winningMessage = ()=>`Player ${currentPlayer} has won`;
const drawMessage =()=> `Game ended in a draw`;
const currentPlayerTurn =()=> `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions=[
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

console.log(gameState);


function handleCellClick(clickedCellEvent){

  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));
   
  console.log(clickedCell);
  console.log(clickedCellIndex);

  if (gameState[clickedCellIndex] !== "" || !gameActive){
    return;
    
  }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex){
  gameState[clickedCellIndex] = currentPlayer; //assign value x or 0 to gameState array
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange(){
  currentPlayer = currentPlayer === "X" ? "0" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();

}

//handleResultValidation  start

function handleResultValidation(){
  let roundOwn = false;

  for(let i = 0; i <= 7; i++ ){
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];

    if (a === '' || b === '' || c === ''){
      continue;
    }

    if (a === b && b === c){
      roundOwn = true;
      break;
    }

    console.log(a)
    console.log(b)
    console.log(c)
  }
  

  if(roundOwn){
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
 
  if(roundDraw){
  statusDisplay.innerHTML = drawMessage();
  gameActive = false;
  return;
  }
  handlePlayerChange();
}

//handleResultValidation end




function handleRestartGame(){
  gameActive = true;
  currentPlayer= "X"
  gameState =["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}




