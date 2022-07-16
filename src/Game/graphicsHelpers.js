import { windowHeight, windowWidth, margin_y, margin_x, slider_padding, drawRectangle, drawArrow } from './helpers';

var PIXI = require('pixi.js');




export function animateArrow1(stageArrowSprites, stage) {
  stageArrowSprites.forEach((item, index) => {
    let currentSpritePosition = getCurrPositionFromSprite(item, stage, index);
    let currentSliderPosition = stage.listOfSliders[index].currPosition;

    if (currentSpritePosition != currentSliderPosition) {
      let new_y_c = getArrowPositions(stage)[index][1];

      if (item.position.y < new_y_c) {
        item.position.y += 3;
        if (item.position.y >= new_y_c) {
          item.position.y = new_y_c;
          if (stage.listOfSliders[index].currPosition == 1) {
            item.rotation += 3.14159;
          }
        }
      }
      if (item.position.y > new_y_c) {
        item.position.y -= 3;
        if (item.position.y <= new_y_c) {
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


export function getSpritesFromGraphics(listOfGraphics, renderer) {
  let result = [];
  listOfGraphics.forEach((item) => {

    let texture = renderer.generateTexture(item);
    let sprite = new PIXI.Sprite(texture);

    result.push(sprite);
  })
  return result;
}

export function drawSetting(stageSettingItems, app_stage) {
  stageSettingItems.forEach((item) => app_stage.addChild(item));
}

export function undrawSetting(stageSettingItems, app) {
  stageSettingItems.forEach((item) => app.stage.removeChild(item));
}

export function drawArrowSprites(stageArrowSprites, stageArrowPositions, app_stage) {
  stageArrowSprites.forEach((item, index) => {
    app_stage.addChild(item);
    item.anchor.x = 0.5;
    item.anchor.y = 0.5;
    item.position.x = stageArrowPositions[index][0];
    item.position.y = stageArrowPositions[index][1];
    item.interactive = true;
    item.buttonMode = true;
  });
}

export function undrawArrowSprites(stageArrowSprites, app) {
  stageArrowSprites.forEach((item, index) => {
    app.stage.removeChild(item);
  });
}


export function getArrowPositions(stage) {
  let result = [];

  stage.listOfSliders.forEach((slider, i) => {
    let x_c = (margin_x + ((1 - 2 * margin_x) / (stage.numberOfSliders + 1)) * (i + 1)) * windowWidth;
    // let y_c = (1 - (margin_y +  slider_padding + (1 / (slider.height + 1 ))*slider.currPosition)) * windowHeight;
    let slider_rectangle_height = ((1 - 2 * margin_y) - 2 * slider_padding);
    let y_c = ((1 - (margin_y + slider_padding)) * windowHeight) - (slider_rectangle_height / (slider.height + 1)) * windowHeight * (slider.currPosition);

    result.push([x_c, y_c]);
  });

  return result
}


export function generateStageSetting(stage) {
  let result = [];
  let fillColor = 0x17179c;

  stage.listOfSliders.forEach((_, i) => {
    let x_c = (margin_x + ((1 - 2 * margin_x) / (stage.numberOfSliders + 1)) * (i + 1)) * windowWidth;
    let y_c = 0.5 * windowHeight;
    let width = (2 / ((stage.numberOfSliders + 1) * 2 + 4)) * windowWidth;
    let height = ((1 - 2 * margin_y) - 2 * slider_padding) * windowHeight;

    let rectangle = drawRectangle(x_c, y_c, width, height, fillColor);
    result.push(rectangle);
  });

  return result
}


export function generateStageArrows(stage) {
  let result = [];
  let fillColor = 0x9c9c17;

  stage.listOfSliders.forEach((slider, i) => {
    let width = (2 / ((stage.numberOfSliders + 1) * 2 + 10)) * windowWidth;
    let height = (((1 - 2 * margin_y) - 2 * slider_padding) / (slider.height + 1)) * windowHeight;
    let x_c = (margin_x + ((1 - 2 * margin_x) / (stage.numberOfSliders + 1)) * (i + 1)) * windowWidth;
    let slider_rectangle_height = ((1 - 2 * margin_y) - 2 * slider_padding);
    let y_c = ((1 - (margin_y + slider_padding)) * windowHeight) - (slider_rectangle_height / (slider.height + 1)) * windowHeight * (slider.currPosition);
    let triangle = drawArrow(x_c, y_c, width, height, fillColor, slider.direction);
    result.push(triangle);
  });

  return result
}

export function startGame(game, stage_number, app) {
  let stage = game.listOfStages[stage_number]
  let stageSettingItems = generateStageSetting(stage);
  drawSetting(stageSettingItems, app.stage);

  let stageArrowItems = generateStageArrows(stage);
  let stageArrowPositions = getArrowPositions(stage);
  let stageArrowSprites = getSpritesFromGraphics(stageArrowItems, app.renderer);

  drawArrowSprites(stageArrowSprites, stageArrowPositions, app.stage);

  // add animation to sprites
  app.ticker.add(() => {
    animateArrow1(stageArrowSprites, stage);
  });


  stageArrowSprites.forEach((item, index) => {
    item.on('pointerdown', function () {
      stage.ExecuteTurn(index);
      if (stage.IsWinning()) {
        console.log("you beat stage " + (stage_number + 1));
        undrawSetting(stageSettingItems, app);
        undrawArrowSprites(stageArrowSprites, app);
        if ((stage_number + 1) < game.listOfStages.length) {
          startGame(game, stage_number + 1, app)
        }
        else {
          console.log("you beat the entire game")
        }

      }
    });
  });
}



export function defineCallbacks(stage, stageArrowSprites) {
  stageArrowSprites.forEach((item, index) => {
    item.on('pointerdown', function () {
      stage.ExecuteTurn(index);
      if (stage.IsWinning()) {
        console.log("you win");
      }
    });
  });
}
