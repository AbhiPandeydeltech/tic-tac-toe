let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame-btn");
let mssgContainer = document.querySelector(".mssg-container");
let mssg = document.querySelector("#msg");


let turnO = true ; //playerO will play , then playerX

//2D array to store winning patterns
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

const resetGame = ()=>{
   turnO=true; //if reset button clicked then turnO value should become true again
   enableBoxes();
   mssgContainer.classList.add("hide");
};

//adding eventListener to each box , querySelectorAll above returns a NodeList
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        // console.log("box was clicked");
        if(turnO){
            box.innerText="O";
            turnO=false;
        }
        else{
            box.innerText="X";
            turnO=true;
        }
        box.disabled = true;  /* if box wasnt given any color then after getting clicked , it wont be clickable further, so the box will show 
                              show the color of background itself, so make sure to give it a color in css*/
        
        //once a button is clicked,then check that time only whether winning pattern matched or not 
        checkWinner();
    });
});

const disableBoxes = ()=>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableBoxes = ()=>{   //this is made when new game starts , then boxes can be used again
    for(let box of boxes){
        box.disabled = false;
        box.innerText=""; //after resetting the game , we have to empty the text in each boxes  
    }
}
const showWinner = (winner)=>{
    mssg.innerText = `Congratulations,Winner is Player ${winner}`;
    mssgContainer.classList.remove("hide");
    disableBoxes(); //now winner wont change after getting a winning pattern 

};
const checkWinner = ()=>{
    for(let pattern of winPatterns){
        let posiVal1 = boxes[pattern[0]].innerText;
        let posiVal2 = boxes[pattern[1]].innerText;
        let posiVal3 = boxes[pattern[2]].innerText;

        if(posiVal1!="" && posiVal2!="" && posiVal3!=""){
            if(posiVal1===posiVal2 && posiVal2===posiVal3){
                // console.log("winner",posiVal1);
                showWinner(posiVal1);  //jaise hi winner milgaya hme vhin rukna pdega , further winner nhi nikalne 
            }
        }
    }
};

//reset game only occur when new game or reset game is clicked 
newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);

