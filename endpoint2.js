import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class endPoint2 extends BaseGameObject {
    blockGravityForces = true;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name === "Skeleton") {
            console.log("Woow..You Save the Animal");
            global.gameOver = true; // Stop the game loop
            global.endMessage = "Woow..You save the animal"; // Set the message
        }
    }
    
    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/endpoint2.png"]);
    }
}

export {endPoint2};