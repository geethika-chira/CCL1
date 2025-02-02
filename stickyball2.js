import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class stickyball2 extends BaseGameObject {
    name = "stickyball"
    yVelocity = 200; // speed of the horizontal movement
    direction = -1; // -1 for left

    reactToCollision = function(collidingObject) {
        switch (collidingObject.name) {
            case "skeleton":
                this.active = false;
                break;
        }
    }

    update = function () {
        // Move vertically
        this.y += this.yVelocity * this.direction * global.deltaTime;

        // Reverse direction if hitting a boundary
        // if (this.x <= 0 || this.x + this.width >= global.getCanvasBounds().right) {
        //     this.direction *= -1;
        // }
        if(this.y <= this.leftBlock || this.y >= this.rightBlock) // make boundaries for enemy
        {
            this.direction *= -1;
        }
        //console.log(this.x)
    }


    constructor (x, y, width, height,leftBlock, rightBlock) {
        super(x, y, width, height);
        this.leftBlock = leftBlock;
        this.rightBlock = rightBlock;
        this.loadImages(["./images/monster.png"]);
    }
}

export {stickyball2};