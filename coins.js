import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class coins extends BaseGameObject {

    reactToCollision = function(collidingObject) {
        if (collidingObject.name === "Skeleton" && this.active) {
            global.score += 5; // Add 5 points to the score
            console.log(`Score increased! Current score: ${global.score}`);
            this.active = false; // Deactivate the coin
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/coins.png"]);
    }
}

export {coins};