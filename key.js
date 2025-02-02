import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class key extends BaseGameObject {

    reactToCollision = function(collidingObject) {
        if (collidingObject.name === "Skeleton" && this.active) {
            
            
            this.active = false; // Deactivate the coin
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/Key.png"]);
    }
}

export {key};