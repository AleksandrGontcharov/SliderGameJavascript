import { windowHeight, windowWidth, margin_x, margin_y, slider_padding } from './helpers';



export function animateArrow1(stageArrowSprites, stage) {
  // stageArrowSprites[0].rotation += 0.01;
  stageArrowSprites.forEach((item, index) => {
    let currentSpritePosition = getCurrPositionFromSprite(item, stage, index);
    let currentSliderPosition = stage.listOfSliders[index].currPosition;

    // console.log("start: Sprite: " + currentSpritePosition + " Slider: " + currentSliderPosition);
    if (currentSpritePosition != currentSliderPosition) {
      let new_y_c = stage.getArrowsPositions()[index][1];

      // console.log(stage.listOfSliders[0].currPosition, currentSpritePosition);

      if (item.position.y < new_y_c) {
        // console.log("moving down " + item.position.y);
        item.position.y += 3;
        if (item.position.y > new_y_c) {
          item.position.y = new_y_c;
          // console.log("moving up " + item.position.y + " new position " + new_y_c);
        }
      }
      if (item.position.y > new_y_c) {
        // console.log("moving up " + item.position.y + " new position " + new_y_c);
        item.position.y -= 3;
        if (item.position.y < new_y_c) {
          item.position.y = new_y_c;
          // console.log("moving up " + item.position.y + " new position " + new_y_c);
        }
      }
    }
  })
}

function getCurrPositionFromSprite(sprite, stage, indexOfSlider) {
  // to be implemented
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
      // Remove all arrows
      stageArrowSprites.forEach((item, index2) => {
        if (index != index2) {
          // I want to animate the arrow to the new position
          if (stage.listOfSliders[index2].currPosition == stage.listOfSliders[index2].height) {
            item.rotation += 3.14159;
          }
          if (stage.listOfSliders[index2].currPosition == 1) {
            item.rotation += 3.14159;
          }
        }

      });
    });
  });
}