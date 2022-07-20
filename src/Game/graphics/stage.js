import { windowHeight, windowWidth, margin_y, margin_x, slider_padding } from './windowLayout';
import { heightPosition, widthPosition } from './background';

var PIXI = require('pixi.js');

function generateRectangle(x_c, y_c, width, height, fillColor) {
  const Graphics = PIXI.Graphics;

  let line_color = 0x1a1ab2;
  let line_width = 2;
  const rectangle = new Graphics();
  rectangle.lineStyle(line_width, line_color, 5)
    .moveTo(x_c - width / 2, y_c - height / 2)
    .lineTo(x_c + width / 2, y_c - height / 2)
    .lineTo(x_c + width / 2, y_c + height / 2)
    .lineTo(x_c - width / 2, y_c + height / 2)
    .lineTo(x_c - width / 2, y_c - height / 2)

  return rectangle;
}

function drawArrow(x_c, y_c, width, height, fillColor, sliderDirection) {
  let x1, y1;
  let x2, y2;
  let x3, y3;
  let x4, y4;

  if (sliderDirection) {
    (x1 = x_c), (y1 = y_c - height / 2);
    (x2 = x_c - width / 2), (y2 = y_c + height / 2);
    (x3 = x_c), (y3 = y_c + height / 4);
    (x4 = x_c + width / 2), (y4 = y_c + height / 2);
  } else {
    (x1 = x_c), (y1 = y_c + height / 2);
    (x2 = x_c + width / 2), (y2 = y_c - height / 2);
    (x3 = x_c), (y3 = y_c - height / 4);
    (x4 = x_c - width / 2), (y4 = y_c - height / 2);
  }

  const Graphics = PIXI.Graphics;
  const arrow = new Graphics();
  arrow
    .beginFill(fillColor)
    .drawPolygon([x1, y1, x2, y2, x3, y3, x4, y4])
    .endFill();

  arrow.direction = sliderDirection;

  return arrow;
}

function animateArrow1(stageArrowSprites, stage) {
  stageArrowSprites.forEach((sprite, index) => {
    let currentSpritePosition = getCurrPositionFromSprite(sprite, stage, index);
    let currentSliderPosition = stage.listOfSliders[index].currPosition;

    if (currentSpritePosition != currentSliderPosition) {
      let new_y_c = getArrowPositions(stage)[index][1];

      if (sprite.position.y < new_y_c) {
        sprite.position.y += 5;
        if (sprite.position.y >= new_y_c) {
          sprite.position.y = new_y_c;
          if (stage.listOfSliders[index].direction != sprite.direction) {
            sprite.direction = stage.listOfSliders[index].direction;
            sprite.rotation += 3.14159;
          }
        }
      }
      if (sprite.position.y > new_y_c) {
        sprite.position.y -= 5;
        if (sprite.position.y <= new_y_c) {
          sprite.position.y = new_y_c;
          if (stage.listOfSliders[index].direction != sprite.direction) {
            sprite.direction = stage.listOfSliders[index].direction;
            sprite.rotation += 3.14159;
          }
        }
      }
    }
  });
}

function getCurrPositionFromSprite(sprite, stage, indexOfSlider) {
  let slider = stage.listOfSliders[indexOfSlider];
  let slider_rectangle_height = ((1 - 2 * margin_y) - 2 * slider_padding);
  let expr1 = ((1 - (margin_y + slider_padding)) * windowHeight);
  let expr2 = (slider_rectangle_height / (slider.height + 1)) * windowHeight;
  let result = (expr1 - sprite.position.y) / expr2;
  return result;
}

function getSpritesFromGraphics(listOfGraphics, renderer) {
  let result = [];
  listOfGraphics.forEach((item) => {

    let texture = renderer.generateTexture(item);
    let sprite = new PIXI.Sprite(texture);
    sprite.direction = item.direction;

    result.push(sprite);
  });
  return result;
}

function drawSetting(stageSettingItems, app_stage) {
  stageSettingItems.forEach((item) => app_stage.addChild(item));
}

function undrawSetting(stageSettingItems, app) {
  stageSettingItems.forEach((item) => app.stage.removeChild(item));
}

function drawArrowSprites(stageArrowSprites, stageArrowPositions, app_stage) {
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

function undrawArrowSprites(stageArrowSprites, app) {
  stageArrowSprites.forEach((item) => {
    app.stage.removeChild(item);
  });
}

function getArrowPositions(stage) {
  let result = [];

  stage.listOfSliders.forEach((slider, i) => {
    let x_c = (margin_x + ((1 - 2 * margin_x) / (stage.numberOfSliders + 1)) * (i + 1)) * windowWidth;
    // let y_c = (1 - (margin_y +  slider_padding + (1 / (slider.height + 1 ))*slider.currPosition)) * windowHeight;
    let slider_rectangle_height = ((1 - 2 * margin_y) - 2 * slider_padding);
    let y_c = ((1 - (margin_y + slider_padding)) * windowHeight) - (slider_rectangle_height / (slider.height + 1)) * windowHeight * (slider.currPosition);

    result.push([x_c, y_c]);
  });

  return result;
}

function generateStageSetting(stage) {
  let result = [];
  let fillColor = 0x17179c;

  stage.listOfSliders.forEach((_, i) => {
    let x_c = (margin_x + ((1 - 2 * margin_x) / (stage.numberOfSliders + 1)) * (i + 1)) * windowWidth;
    let y_c = 0.5 * windowHeight;
    let width = (2 / ((stage.numberOfSliders + 1) * 2 + 4)) * windowWidth;
    let height = ((1 - 2 * margin_y) - 2 * slider_padding) * windowHeight;

    let rectangle = generateRectangle(x_c, y_c, width, height, fillColor);
    result.push(rectangle);
  });

  return result;
}

function generateStageIntro(stageNumber) {
  let style = new PIXI.TextStyle({
    fontSize: 20,
    fill: 0xFFFFFF,
    align: 'center'
  });
  let stageIntroText = new PIXI.Text('Stage ' + stageNumber.toString(), style);
  stageIntroText.x = heightPosition(margin_x);
  stageIntroText.y = widthPosition(0.02);
  return stageIntroText;
}

function drawStageIntro(stageIntroText, app_stage) {
  app_stage.addChild(stageIntroText);
}


function undrawStageIntro(stageIntroText, app_stage) {
  app_stage.removeChild(stageIntroText);
}


function generateStageArrows(stage) {
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

  return result;
}

export function startGame(game, stage_number, app) {
  let stage = game.listOfStages[stage_number];
  let stageSettingItems = generateStageSetting(stage);
  drawSetting(stageSettingItems, app.stage);

  let stageArrowItems = generateStageArrows(stage);
  let stageArrowPositions = getArrowPositions(stage);
  let stageArrowSprites = getSpritesFromGraphics(stageArrowItems, app.renderer);

  let stageIntroText = generateStageIntro(stage_number + 1);
  drawStageIntro(stageIntroText, app.stage);

  drawArrowSprites(stageArrowSprites, stageArrowPositions, app.stage);

  // add animation to sprites
  app.ticker.add(() => {
    animateArrow1(stageArrowSprites, stage);
  });


  stageArrowSprites.forEach((item, index) => {
    item.on('pointerdown', function () {
      stage.ExecuteTurn(index);
      if (stage.IsWinning()) {
        console.log('you beat stage ' + (stage_number + 1));
        undrawSetting(stageSettingItems, app);
        undrawArrowSprites(stageArrowSprites, app);
        undrawStageIntro(stageIntroText, app.stage);

        if ((stage_number + 1) < game.listOfStages.length) {
          startGame(game, stage_number + 1, app);
        }
        else {
          console.log('you beat the entire game');
        }

      }
    });
  });
}