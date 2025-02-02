import { Skeleton } from "../gameObjects/skeleton.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
import { BlockObject } from "../gameObjects/blockObject.js";
import { Floor } from "../gameObjects/floor.js";
import { coins } from "../gameObjects/coins.js";
import { mistryBox } from "../gameObjects/mistrybox.js";
import { stickyball } from "../gameObjects/stickyball.js";
import { endPoint } from "../gameObjects/endpoint.js";
import { key } from "../gameObjects/key.js";
import { endPoint2 } from "../gameObjects/endpoint2.js";
import { BlockObject2 } from "../gameObjects/blockObject2.js";
import { stickyball2 } from "../gameObjects/stickyball2.js";

const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.backgroundShift = 0;
global.backgroundMaxShift = -3500;
global.gravityForce = 9.8;
global.pixelToMeter = 100;
global.leftMoveTrigger;
global.rightMoveTrigger;
global.stickyBallSpeed = 100;
global.playerHealth = 3; // Initial health of the skeleton
global.gameOver = false; // Track whether the game is over.
global.score = 0; // Initialize the score

global.getCanvasBounds = function () {
    let bounds =  {
        "left": 0,
        "right": this.canvas.width,
        "top": 0, 
        "bottom": this.canvas.height
    }

    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {
    for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}




global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom && 
            box1.left <= box2.right && 
            box1.bottom >= box2.top &&
            box1.right >= box2.left)
        {
            return true;
        }
    }
    return false;
}


global.resetGame = function () {
    global.deltaTime = 0;
    global.allGameObjects = [];
    global.playerObject = {};
    global.backgroundShift = 0;
    global.backgroundMaxShift = -4500;
    global.gravityForce = 9.8;
    global.pixelToMeter = 100;
    global.leftMoveTrigger;
    global.rightMoveTrigger;
    global.stickyBallSpeed = 100;
    global.gameOver = false;
}

global.setupGameLevel1 = function () {
    global.playerObject = new Skeleton(100, 0, 64, 64);
    global.leftMoveTrigger = new MoveTrigger(70, 0, 20, 900, 100);
    global.rightMoveTrigger = new MoveTrigger(800, 0, 20, 900, -80);
    new Floor(0, 480, 4500, 40);
    
   
    new BlockObject(700, 320, 100, 50);
    new BlockObject(800, 200, 100, 50);
    new BlockObject(900, 150, 200, 50);
    new BlockObject(1100, 250, 100, 50);
    new BlockObject(1500, 150, 300, 50);
    new BlockObject(1750, 300, 200, 50);
    new BlockObject(2600, 300, 400, 50);
    new BlockObject(3100, 200, 300, 50);
    new BlockObject(3500, 170, 150, 50);

    new mistryBox (1000, 100, 50, 50);
    new mistryBox (2900, 250, 50, 50);
    


    new stickyball (750, 440, 50, 50, 650, 850);
    new stickyball (1350, 440, 50, 50 , 1180, 1400);
    new stickyball (1750, 250, 50, 50, 1730, 1900);
    new stickyball (1750, 440, 50, 50, 1500, 1980);
    new stickyball (2800, 250, 50, 50, 2700, 2850);
    new stickyball (2300, 440, 50, 50, 2200, 2850);
    new stickyball (3300, 440, 50, 50, 3200, 3500);

    new coins(225,330,50,50);
    new coins(280,330,50,50);
    new coins (720,270,50,50);
    new coins (900, 100, 50, 50);
    new coins (810, 150, 50, 50);
    new coins (410, 430, 50, 50);
    new coins (470, 430, 50, 50);
    new coins (530, 430, 50, 50);
    new coins (1000, 430, 50, 50);
    new coins (1060, 430, 50, 50);
    new coins (1120, 430, 50, 50);
    new coins (1510, 103, 50, 50);
    new coins (1570, 103, 50, 50);
    new coins (1630, 103, 50, 50);
    new coins (1500, 340, 50, 50);
    new coins (1560, 340, 50, 50);
    new coins (1620, 340, 50, 50);
    new coins (2040, 430, 50, 50);
    new coins (1680, 430, 50, 50);
    new coins (2100, 430, 50, 50);
    new coins (2160, 430, 50, 50);

    new coins (2300, 330, 50, 50);
    new coins (2360, 330, 50, 50);
    
    new coins (2420, 330, 50, 50);
    new coins (2480, 330, 50, 50);
    new coins (2650, 250, 50, 50);
    new coins (3150, 150, 50, 50);
    new coins (3210, 150, 50, 50);
    new coins (3270, 150, 50, 50);
    new coins (2990, 430, 50, 50);
    new coins (3050, 430, 50, 50);
    new coins (3110, 430, 50, 50);

    new endPoint (3700, 90, 300, 400);
    new key (3550, 85, 70, 100);
    
    // setup your game here - means: Create instances of the GameObjects that belong to your game.
    // e.g.: 
    /*    
                global.playerObject = new PacMan(200, 300, 60, 60);
                new Wall(0, 0, 100, 100);
                new Candy(100, 100, 100, 100);
    }*/
   
}

global.setupGameLevel2 = function () {
    global.resetGame();
    let backgroundDiv = document.querySelector("#background");
    console.log("test")
    backgroundDiv.style.backgroundImage = "url('../images/path.png')";

    global.playerObject = new Skeleton(100, 300, 64, 64);
    global.leftMoveTrigger = new MoveTrigger(70, 0, 20, 900, 100);
    global.rightMoveTrigger = new MoveTrigger(800, 0, 20, 900, -80);
    new Floor(0, 430, 4500, 40);
    
   
    
    new BlockObject2(800, 250, 100, 50);
    new BlockObject2(900, 150, 200, 50);
    new BlockObject2(1100, 250, 200, 50);
    new BlockObject2(1500, 150, 300, 50);
    new BlockObject2(1750, 300, 200, 50);
    new BlockObject2(2600, 200, 400, 50);
    new BlockObject2(3100, 270, 100, 50);

    new mistryBox (1700, 100, 50, 50);
    new mistryBox (2900, 150, 50, 50);
   


    new stickyball2 (550, 60, 50, 50, 50, 390);
    new stickyball2 (1360, 60, 50, 50, 50, 390);
    new stickyball (1200, 200, 50, 50 , 1100, 1250);
    new stickyball (1750, 250, 50, 50, 1730, 1900);
    new stickyball (1750, 390, 50, 50, 1500, 1980);
    new stickyball2 (2300, 60, 50, 50, 50, 390);
    new stickyball (2800, 150, 50, 50, 2700, 2850);
    new stickyball (3100, 390, 50, 50, 3000, 3250);

    new coins(225,390,50,50);
    new coins(280,390,50,50);
    new coins (720,390,50,50);
    new coins (410, 280, 50, 50);
    new coins (470, 280, 50, 50);
    new coins (530, 280, 50, 50);
    new coins (900, 100, 50, 50);
    new coins (965, 100, 50, 50);
    new coins (1030, 100, 50, 50);
    new coins (820, 200, 50, 50);
    new coins (1000, 390, 50, 50);
    new coins (1060, 390, 50, 50);
    new coins (1120, 390, 50, 50);
    new coins (1510, 103, 50, 50);
    new coins (1570, 103, 50, 50);
    new coins (1630, 103, 50, 50);
    new coins (1500, 280, 50, 50);
    new coins (1560, 280, 50, 50);
    new coins (1620, 280, 50, 50);
    new coins (2040, 390, 50, 50);
    new coins (1680, 390, 50, 50);
    new coins (2100, 390, 50, 50);
    new coins (2160, 390, 50, 50);

    new coins (2300, 280, 50, 50);
    new coins (2360, 280, 50, 50);
    
    new coins (2420, 280, 50, 50);
    new coins (2480, 280, 50, 50);
    new coins (2800, 390, 50, 50);
    new coins (2860, 390, 50, 50);
    new coins (2920, 390, 50, 50);
    new coins (2650, 150, 50, 50);

    new endPoint2 (3700, 220, 250, 250);
    

}

export { global }