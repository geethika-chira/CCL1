import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Skeleton extends BaseGameObject {
    name = "Skeleton";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;
    

    reactToCollision = function (collidingObject) {
        if (global.playerHealth <= 0) return; // Stop reacting when health is zero.

        switch (collidingObject.constructor.name) {
            case "stickyball":
                collidingObject.xVelocity *= -1;
                this.x = this.previousX - 20;
                collidingObject.x = collidingObject.previousX;
                global.playerHealth--;
                console.log(`Health reduced! Current health: ${global.playerHealth}`);
                
                if (global.playerHealth <= 0) {
                    console.log("Game Over! Skeleton is out of health.");
                    global.gameOver = true; // Trigger game over.
                }

            break;

            case "mistryBox":
                global.playerHealth++;
                console.log(`Health increased! Current health: ${global.playerHealth}`);
            break;

            case "coins":
                    if (collidingObject.active) {
                        global.score += 5;
                        console.log(`Score increased! Current score: ${global.score}`);
                        collidingObject.active = false; // Deactivate the coin after collection
                    }
            break;
        }
    }

    getBoxBounds = function () {
        let bounds = {
            left: this.x + 18,
            right: this.x + this.width - 22,
            top: this.y + 14,
            bottom: this.y + this.height - 3
        }
        return bounds;
    }

    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity == 0) {
            global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }
    }

    /*draw = function () {
        global.ctx.fillStyle = "#000000";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    }*/

    constructor(x, y, width, height) {
        super(x, y, width, height);
        //this.loadImages(["./images/apple.png"]);
        this.loadImagesFromSpritesheet("./images/BODY_skeleton.png", 9, 4);
    }
}

export {Skeleton}