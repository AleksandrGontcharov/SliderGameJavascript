var PIXI = require('pixi.js');  

export let windowHeight = window.innerHeight;
export let windowWidth = window.innerHeight*0.8;
export let margin_x = 0.1;
export let margin_y = 0.07;


  function heightPosition(percent) {
    return percent*windowHeight
  }
  function widthPosition(percent) {
    return percent*windowWidth
  }

export function drawBackground() {
  const Graphics = PIXI.Graphics;
  let line_color = 0x1a1ab2;
  let line_width = 3;
  const topLine = new Graphics();
  topLine.lineStyle(line_width, line_color, 5)
  .moveTo(widthPosition(margin_x), heightPosition(margin_y))
  .lineTo(widthPosition(1 - margin_x),heightPosition(margin_y))

  const bottomLine = new Graphics();
  bottomLine.lineStyle(line_width, line_color, 5)
  .moveTo(widthPosition(margin_x), heightPosition(1 - margin_y))
  .lineTo(widthPosition(1 - margin_x),heightPosition(1 - margin_y))

  const leftLine = new Graphics();
  leftLine.lineStyle(line_width, line_color, 5)
  .moveTo(widthPosition(margin_x), heightPosition(margin_y))
  .lineTo(widthPosition(margin_x),heightPosition(1 - margin_y))

  const rightLine = new Graphics();
  rightLine.lineStyle(line_width, line_color, 5)
  .moveTo(widthPosition(1 - margin_x), heightPosition(margin_y))
  .lineTo(widthPosition(1 - margin_x), heightPosition(1 - margin_y))

  return [topLine, bottomLine, leftLine, rightLine]
}