var PIXI = require('pixi.js');

export function drawRectangle(x_c, y_c, width, height, fillColor) {
  const Graphics = PIXI.Graphics;
  const rectangle = new Graphics();
  rectangle.beginFill(fillColor)
    .drawRoundedRect(x_c - width / 2, y_c - height / 2, width, height, 20)
    .endFill();

  return rectangle;
}

export function drawArrow(x_c, y_c, width, height, fillColor, sliderDirection) {

  let x1, y1;
  let x2, y2;
  let x3, y3;
  let x4, y4;

  if (sliderDirection) {
    x1 = x_c, y1 = y_c - height / 2;
    x2 = x_c - width / 2, y2 = y_c + height / 2;
    x3 = x_c, y3 = y_c + height / 4;
    x4 = x_c + width / 2, y4 = y_c + height / 2;
  }

  else {
    x1 = x_c, y1 = y_c + height / 2;
    x2 = x_c + width / 2, y2 = y_c - height / 2;
    x3 = x_c, y3 = y_c - height / 4;
    x4 = x_c - width / 2, y4 = y_c - height / 2;
  }

  const Graphics = PIXI.Graphics;
  const arrow = new Graphics();
  arrow.beginFill(fillColor)
    .drawPolygon([
      x1, y1,
      x2, y2,
      x3, y3,
      x4, y4
    ])
    .endFill();

  return arrow;
}

export function heightPosition(percent) {
  return percent * windowHeight;
}
export function widthPosition(percent) {
  return percent * windowWidth;
}

export let windowHeight = window.innerHeight;
export let windowWidth = window.innerHeight * 0.8;
export let margin_x = 0.1;
export let margin_y = 0.07;
export let slider_padding = 0.025;


export function getSpritesFromGraphics(listOfGraphics, renderer) {
  let result = [];
  listOfGraphics.forEach((item) => {

    let texture = renderer.generateTexture(item);
    let sprite = new PIXI.Sprite(texture);

    result.push(sprite);
  })
  return result;
}

export function placeArrowSprites(stageArrowSprites, stageArrowPositions, app_stage) {
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