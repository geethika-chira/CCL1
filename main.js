import { global } from "./global.js";





function gameLoop(totalRunningTime) { 

    if (global.gameOver) {
        // Display "Game Over" message
        global.ctx.font = "60px Arial";
        global.ctx.fillStyle = "red";
        global.ctx.fillText(global.endMessage || "Game Over", global.canvas.width / 2 - 200, global.canvas.height / 2);
        return; // Stop the game loop.
    }


        global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
        global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
        global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
        
        global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 
    
    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }

    // Display health and score dynamically with canvas movement
    
        /*global.ctx.font = "30px curve";
        global.ctx.fillStyle = "red";
        global.ctx.fillText(`Health: ${global.playerHealth}`, 10 - global.backgroundShift, 30);
        global.ctx.fillStyle = "blue";
        global.ctx.fillText(`Score: ${global.score}`, 10 - global.backgroundShift, 60);
*/

// Define maximum health and health per heart
const maxHealth = 7; 
const healthPerHeart = 1; // Health points per heart

// Calculate the number of full hearts to display
const heartCount = Math.ceil(global.playerHealth / healthPerHeart);

// Heart emoji
const heartEmoji = "❤️";

// Draw hearts dynamically based on health
global.ctx.font = "30px Arial"; // Set font for the heart emojis
global.ctx.fillStyle = "red";

// Calculate the position for the hearts
const startX = 15 - global.backgroundShift;
const startY = 30;

for (let i = 0; i < heartCount; i++) {
    global.ctx.fillText(heartEmoji, startX + i * 30, startY);
}


/* Display score
global.ctx.font = "30px curve";
global.ctx.fillStyle = "white";
global.ctx.fillText(`Score: ${global.score}`, 10 - global.backgroundShift, 60);
*/

// Coin emoji
const coinEmoji = "🪙"; // Use the emoji you prefer 

// Positioning for coins
const coinX = 10 - global.backgroundShift;
const coinY = 80;

// Draw the coin emoji and score
global.ctx.font = "40px Arial"; // Set font for the coin
global.ctx.fillStyle = "gold";
global.ctx.fillText(`${coinEmoji} ${global.score}`, coinX, coinY);
    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}





global.setupGameLevel1();
requestAnimationFrame(gameLoop);



