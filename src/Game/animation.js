import { windowHeight, windowWidth, margin_x, margin_y, slider_padding } from './helpers';



export function animateArrow1(stageArrowSprites, stage) {
  stageArrowSprites.forEach((item, index) => {
    let currentSpritePosition = getCurrPositionFromSprite(item, stage, index);
    let currentSliderPosition = stage.listOfSliders[index].currPosition;

    if (currentSpritePosition != currentSliderPosition) {
      let new_y_c = stage.getArrowsPositions()[index][1];

      if (item.position.y < new_y_c) {
        item.position.y += 3;
        if (item.position.y > new_y_c) {
          item.position.y = new_y_c;
          if (stage.listOfSliders[index].currPosition == 1) {
            item.rotation += 3.14159;
          }
        }
      }
      if (item.position.y > new_y_c) {
        item.position.y -= 3;
        if (item.position.y < new_y_c) {
          item.position.y = new_y_c;
          if (stage.listOfSliders[index].currPosition == stage.listOfSliders[index].height) {
            item.rotation += 3.14159;
          }
        }
      }
    }
  })
}

function getCurrPositionFromSprite(sprite, stage, indexOfSlider) {
  let slider = stage.listOfSliders[indexOfSlider];
  let slider_rectangle_height = ((1 - 2 * margin_y) - 2 * slider_padding);
  let expr1 = ((1 - (margin_y + slider_padding)) * windowHeight);
  let expr2 = (slider_rectangle_height / (slider.height + 1)) * windowHeight;
  let result = (expr1 - sprite.position.y) / expr2;
  return result;
}

export function defineCallbacks(stage, stageArrowSprites) {
  stageArrowSprites.forEach((item, index) => {
    item.on('pointerdown', function () {
      stage.ExecuteTurn(index);
    });
  });
}