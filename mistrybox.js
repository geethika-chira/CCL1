import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class mistryBox extends BaseGameObject {

    reactToCollision = function(collidingObject) {
        switch (collidingObject.name) {
            case "Skeleton":
                this.active = false;
                break;
        }
    }

    constructor (x, y, width, height) {
        super(x, y, width, height);
        this.loadImages(["./images/box.jpg"]);
    }
}

export {mistryBox};