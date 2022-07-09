import { drawRectangle, drawArrow } from './helpers';
import { windowHeight, windowWidth, margin_x, margin_y } from './background';


let slider_padding = 0.025;
export class Stage
{
    constructor(listOfSliders) {
        this.listOfSliders = listOfSliders;
        this.numberOfSliders = listOfSliders.length;
    }

    ExecuteTurn(index) {
        this.listOfSliders.forEach((slider,i) => {
            if (index != i) {
                slider.Next()
            }
        })
    }



    IsWinning() {
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

    drawSetting() {
        let result = [];
        
        let fillColor = 0x17179c;

        this.listOfSliders.forEach((_,i) => {
            let x_c = (margin_x + ((1 - 2*margin_x)/(this.numberOfSliders + 1))*(i + 1))*windowWidth;
            let y_c = 0.5 * windowHeight;
            let width = (2 / ((this.numberOfSliders + 1)* 2 + 4)) * windowWidth;
            let height = ((1 - 2*margin_y) - 2*slider_padding)* windowHeight;
    
            let rectangle = drawRectangle(x_c ,y_c ,width ,height, fillColor);
            result.push(rectangle);
        });

        return result
    }

    drawArrows() {
        let result = [];
        let fillColor = 0x9c9c17;

        this.listOfSliders.forEach((slider, i) => {
            let width = (2 / ((this.numberOfSliders + 1)* 2 + 10)) * windowWidth;
            let height = (((1 - 2*margin_y) - 2*slider_padding) / (slider.height + 1 )) * windowHeight;
            let x_c = (margin_x + ((1 - 2*margin_x)/(this.numberOfSliders + 1))*(i + 1))*windowWidth;
            // let y_c = (1 - (margin_y +  slider_padding + (1 / (slider.height + 1 ))*slider.currPosition)) * windowHeight;
            let slider_rectangle_height = ((1 - 2*margin_y) - 2*slider_padding);
            let y_c = ((1 - (margin_y +  slider_padding)) * windowHeight)  - (slider_rectangle_height / (slider.height + 1))*windowHeight * (slider.currPosition);

    
            let triangle = drawArrow(x_c ,y_c ,width ,height, fillColor, slider.direction);
            result.push(triangle);
        });

        return result
    }
}
