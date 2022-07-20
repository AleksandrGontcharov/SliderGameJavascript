var PIXI = require('pixi.js');

import { margin_x, margin_y, windowHeight, windowWidth } from './windowLayout';

export function heightPosition(percent) {
  return percent * windowHeight;
}

export function widthPosition(percent) {
  return percent * windowWidth;
}

export function drawBackground() {
  const Graphics = PIXI.Graphics;
  let line_color = 0x1a1ab2;
  let line_width = 2;
  const rectangle = new Graphics();
  rectangle.lineStyle(line_width, line_color, 5)
    .moveTo(widthPosition(margin_x), heightPosition(margin_y))
    .lineTo(widthPosition(1 - margin_x), heightPosition(margin_y))
    .lineTo(widthPosition(1 - margin_x), heightPosition(1 - margin_y))
    .lineTo(widthPosition(margin_x), heightPosition(1 - margin_y))
    .lineTo(widthPosition(margin_x), heightPosition(margin_y));
  return [rectangle];
}