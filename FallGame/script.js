// Luis Carrillo, 921749501, Myst1cLeaf
//variables that can be changed globally. Inludes the ball, game, interval, both, counter, and current blocks.
var ball = document.getElementById("ball");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

//This function is the function that moves the ball left.
function moveLeft(){
    var left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if(left>0){
        ball.style.left = left - 2 + "px";
    }
}
//This function is the function that moves the ball right.
function moveRight(){
    var left = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    if(left<780){
        ball.style.left = left + 2 + "px";
    }
}
//This event makes it so that when you press either the left or right arrow key it sets the interval to move left or right.
document.addEventListener("keydown", event => {
    if(both==0){
        both++;
        if(event.key==="ArrowLeft"){
            interval = setInterval(moveLeft, 1);
        }
        if(event.key==="ArrowRight"){
            interval = setInterval(moveRight, 1);
        }
    }
});
//This event makes it so when we unclick the key it stops moving.
document.addEventListener("keyup", event => {

    clearInterval(interval);
    both=0;

});
//This creates the blocks with random holes that the ball can go through. Also uses the counter to keep track of your score.
//Uses blockLast, blockLastTop, holeLast, and holeLastTop, to create random blocks and holes 100px away from each other.
//Only creates the row if it has enough room  in this case 800px.
var blocks = setInterval(function(){

    var blockLast = document.getElementById("block"+(counter-1));
    var holeLast = document.getElementById("hole"+(counter-1));

    if(counter>0){
        var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
        var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
    }

    if(blockLastTop<800||counter==0){
        var block = document.createElement("div");
        var hole = document.createElement("div");
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block"+counter);
        hole.setAttribute("id", "hole"+counter);
        block.style.top = blockLastTop + 100 + "px";
        hole.style.top = holeLastTop + 100 + "px";
        var random = Math.floor(Math.random() * 760);
        hole.style.left = random + "px";
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }

    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var drop = 0;
//Gives alert that the game is over with score and restarts the game once you click ok.
    if(ballTop <= 0){
        alert("Game over. Score: "+(counter-16));
        clearInterval(blocks);
        location.reload();
    }
    //creates the movement of the blocks and holes. While removing the older blocks.
    //Also makes the movement of the drop possible.
    //The higher the counter the faster it goes.

       
    for(var i = 0; i < currentBlocks.length;i++){
        let current = currentBlocks[i];
        let iblock = document.getElementById("block"+current);
        let ihole = document.getElementById("hole"+current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        if(counter < 30){
            iblock.style.top = iblockTop - .50 + "px";
            ihole.style.top = iblockTop - .50 + "px";
            if(iblockTop < -20){
                currentBlocks.shift();
                iblock.remove();
                ihole.remove();
            }

            if(iblockTop-20<ballTop && iblockTop>ballTop){
                drop++;
                if(iholeLeft<=ballLeft && iholeLeft+20>=ballLeft){
                    drop = 0;
                }
            }
        }
        else if(counter < 50){
            iblock.style.top = iblockTop - .60 + "px";
            ihole.style.top = iblockTop - .60 + "px";
            if(iblockTop < -20){
                currentBlocks.shift();
                iblock.remove();
                ihole.remove();
            }

            if(iblockTop-20<ballTop && iblockTop>ballTop){
                drop++;
                if(iholeLeft<=ballLeft && iholeLeft+20>=ballLeft){
                    drop = 0;
                }
            }
        }
        else if(counter < 75){
            iblock.style.top = iblockTop - .65 + "px";
            ihole.style.top = iblockTop - .65 + "px";
            if(iblockTop < -20){
                currentBlocks.shift();
                iblock.remove();
                ihole.remove();
            }

            if(iblockTop-20<ballTop && iblockTop>ballTop){
                drop++;
                if(iholeLeft<=ballLeft && iholeLeft+20>=ballLeft){
                    drop = 0;
                }
            }
        }
	else{
            iblock.style.top = iblockTop - .70 + "px";
            ihole.style.top = iblockTop - .70 + "px";
            if(iblockTop < -20){
                currentBlocks.shift();
                iblock.remove();
                ihole.remove();
            }

            if(iblockTop-20<ballTop && iblockTop>ballTop){
                drop++;
                if(iholeLeft<=ballLeft && iholeLeft+20>=ballLeft){
                    drop = 0;
                }
            }
        }



    }
   
    if(drop==0){
        if(ballTop < 880){
            ball.style.top = ballTop + 2 + "px";
        }
    }else{
        ball.style.top = ballTop - 0.5 + "px";
    }
},1);
