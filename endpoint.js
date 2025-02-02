import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";


class endPoint extends BaseGameObject {
    blockGravityForces = true;

    reactToCollision = function (collidingObject) {
        if (collidingObject.name === "Skeleton") {
            console.log("Level Complete! Loading Level 2...");
            global.setupGameLevel2(); // Transition to Level 2
        }
    }
    
    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/endpoint.png"]);
    }
}

export {endPoint};