export class Slider {
    constructor(height, currPosition, direction) {
        this.constructorHelper(height, currPosition, direction);
    }

    constructorHelper(height, currPosition, direction) {
        if (currPosition >= height) {
            currPosition = height;
            direction = false;
        } else if (currPosition <= 1) {
            currPosition = 1;
            direction = true;
        }

        // If currPosition and direction are not provided then generate them
        if (currPosition == undefined) {
            currPosition = Math.floor(Math.random() * (height)) + 1;
        }

        if (direction == undefined) {
            direction = Math.random() * 2 < 1;
        }
        
        this.height = height;
        this.currPosition = currPosition;
        this.direction = direction;
    }

    Next() {
        // edge cases
        if (this.currPosition == this.height || !this.direction) {
            this.currPosition = this.currPosition - 1;
            this.constructorHelper(this.height, this.currPosition, false);
        } else if (this.currPosition == 1 || this.direction) {
            this.currPosition = this.currPosition + 1;
            this.constructorHelper(this.height, this.currPosition, true);
        }
    }
}