export class Stage
{
    constructor(listOfSliders) {
        this.listOfSliders = listOfSliders;
    }

    ExecuteTurn(index)
    {
        for (let i = 0; i < this.listOfSliders.length; i++)
        {
            if ((index - 1) != i) { 
                this.listOfSliders[i].Next();
            }
        }
    }

    IsWinning()
    {
        this.firstCurrPosition = this.listOfSliders[0].currPosition;
        let isWinning = true;

        for (let i = 1; i < this.listOfSliders.length; i++)
        {
            if (this.firstCurrPosition != this.listOfSliders[i].currPosition)
            {
                isWinning = false;
                return isWinning;
            }
        }

        return isWinning;
    }
}
