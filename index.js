const boxes=document.querySelectorAll(".box");
const gameInfo= document.querySelector(".game-info");
const gameBtn= document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPos=[
    // /Straight line ->left to right
    [0,1,2],
    [3,4,5],
    [6,7,8],

    //Top to bottom
    [0,3,6],
    [1,4,7],
    [2,5,8],

    //diagnally
    [0,4,8],
    [2,4,6],
]

//function to initialize the game
function initializeGame(){
    currentPlayer="X";
    gameGrid=["", "", "", "", "", "", "", "",""];

    //UI pr empty krna pdega
    boxes.forEach((box, index)=>{
        box.innerText="";
        boxes[index].style.pointerEvents="all"; 
    })

    boxes.forEach((box)=>{
        box.classList.remove("win");
    })
    
    gameBtn.classList.remove("active");
    gameInfo.innerText= `Current Player - ${currentPlayer}`
}

initializeGame();

//Boxes pr event listener
boxes.forEach((box, index)=>{
    box.addEventListener("click", ()=>{
        handleClick(index);  
    })
})

function handleClick(index){
    //Agar available hai tbhi daalo 
    if(gameGrid[index]===""){
        boxes[index].innerText= currentPlayer;
        gameGrid[index]=currentPlayer;
        boxes[index].style.pointerEvents="none";
        //swap turns
        swapTurn();

        //check koi jeeta toh nahi
        checkGameOver();
    }
}



function swapTurn(){
    if(currentPlayer === "X"){
        currentPlayer = "O"
    }
    else{
         currentPlayer="X";
    }

    //update on UI
    gameInfo.innerHTML=`Current Player - ${currentPlayer}`;
}

//IMP AND CLASSY FUNCTION
function checkGameOver(){
    let answer="";

    winningPos.forEach((position)=>{
        //check if the values arre non empty and equal 
        if( (gameGrid[position[0]] !== "" && gameGrid[position[1]]!== "" && gameGrid[position[2]] !== "") && 
        (gameGrid[position[0]] === gameGrid[position[1]] ) && gameGrid[position[1]] === gameGrid[position[2]]){

            if(gameGrid[position[0]] ==="X"){
                answer="X";
            }
            else{
                answer="O";
            }

            //Agar winner mil gya toh pointer event bnd kraado
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })

            //un boxes pr green color
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //It means we have a winner
    if(answer!== ""){
        gameInfo.innerHTML=`Winner Player - ${answer}`;
        gameBtn.classList.add("active");
        return;
    }


    //when it is a tie;
    let fillCount=0;

    gameGrid.forEach((box)=>{
        if(box !==""){
            fillCount++;
        }
    })
        
    
    if(fillCount===9){
        gameInfo.innerText= "Tied";
        gameBtn.classList.add("active");
    }
}

gameBtn.addEventListener("click", initializeGame);