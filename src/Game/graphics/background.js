var PIXI = require('pixi.js');
import { GlowFilter } from '@pixi/filter-glow';

import { widthPosition, heightPosition, margin_x, margin_y } from './helpers';


export function drawBackground() {
  const Graphics = PIXI.Graphics;
  let line_color = 0x1a1ab2;
  let line_width = 3;
  const topLine = new Graphics();
  topLine.lineStyle(line_width, line_color, 5)
    .moveTo(widthPosition(margin_x), heightPosition(margin_y))
    .lineTo(widthPosition(1 - margin_x), heightPosition(margin_y));

  const bottomLine = new Graphics();
  bottomLine.lineStyle(line_width, line_color, 5)
    .moveTo(widthPosition(margin_x), heightPosition(1 - margin_y))
    .lineTo(widthPosition(1 - margin_x), heightPosition(1 - margin_y));

  const leftLine = new Graphics();
  leftLine.lineStyle(line_width, line_color, 5)
    .moveTo(widthPosition(margin_x), heightPosition(margin_y))
    .lineTo(widthPosition(margin_x), heightPosition(1 - margin_y));

  const rightLine = new Graphics();
  rightLine.lineStyle(line_width, line_color, 5)
    .moveTo(widthPosition(1 - margin_x), heightPosition(margin_y))
    .lineTo(widthPosition(1 - margin_x), heightPosition(1 - margin_y));

  // const texture = renderer.generateTexture(topLine);
  // const topLineSprite = new PIXI.Sprite(texture);
  // App.stage.addChild(topLineSprite);
  rightLine.filters = [new GlowFilter()];
  topLine.filters = [new GlowFilter()];
  bottomLine.filters = [new GlowFilter()];
  leftLine.filters = [new GlowFilter()];



  return [topLine, bottomLine, leftLine, rightLine];
}