export class Stage {
    constructor(listOfSliders) {
        this.listOfSliders = listOfSliders;
        this.numberOfSliders = listOfSliders.length;
    }

    ExecuteTurn(index) {
        this.listOfSliders.forEach((slider, i) => {
            if (index != i) {
                slider.Next();
            }
        })
    }

    IsWinning() {
        this.firstCurrPosition = this.listOfSliders[0].currPosition;
        let isWinning = true;

        for (let i = 1; i < this.listOfSliders.length; i++) {
            if (this.firstCurrPosition != this.listOfSliders[i].currPosition) {
                isWinning = false;
                return isWinning;
            }
        }

        return isWinning;
    }
}
