var PIXI = require('pixi.js');
const { Slider } = require('./Game/Slider');
const { Stage } = require('./Game/Stage');

const Application = PIXI.Application;
const app = new Application({ width: 500, 
                              height: 500, 
                              transparent: false,
                              antialias: true});



app.renderer.backgroundColor = 0x23395D;

app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.view.style.position = "absolute";

document.body.appendChild(app.view);

function heightPosition(percent) {
  return percent*window.innerHeight
}
function widthPosition(percent) {
  return percent*window.innerWidth
}

const Graphics = PIXI.Graphics;


// Generate the first Stage of the game with 3 sliders of height 5
let slider1 = new Slider(5, 1, false);
let slider2 = new Slider(5, 3, false);
let slider3 = new Slider(5, 5, false);


let stage1 = new Stage([slider1,slider2,slider3])

console.log("Stage 1 initial is winning: " + stage1.IsWinning())


// Draw the initial stage outline

let padding = 0.1;
const topLine = new Graphics();
topLine.lineStyle(10, 0xFFFFFF, 5)
.moveTo(widthPosition(padding), heightPosition(padding))
.lineTo(widthPosition(1 - padding),heightPosition(padding))

const bottomLine = new Graphics();
bottomLine.lineStyle(10, 0xFFFFFF, 5)
.moveTo(widthPosition(padding), heightPosition(1 - padding))
.lineTo(widthPosition(1 - padding),heightPosition(1 - padding))

const leftLine = new Graphics();
leftLine.lineStyle(10, 0xFFFFFF, 5)
.moveTo(widthPosition(padding), heightPosition(padding))
.lineTo(widthPosition(padding),heightPosition(1 - padding))

const rightLine = new Graphics();
rightLine.lineStyle(10, 0xFFFFFF, 5)
.moveTo(widthPosition(1 - padding), heightPosition(padding))
.lineTo(widthPosition(1 - padding), heightPosition(1 - padding))

app.stage.addChild(topLine);
app.stage.addChild(bottomLine);
app.stage.addChild(leftLine);
app.stage.addChild(rightLine);

// Draw lines corresponding to the sliders of the stage

let number_of_sliders = stage1.listOfSliders.length

function get_x_coordinates_of_sliders(listOfSliders) {
  result = [];
  listOfSliders.forEach((_, index) => result.push(((1 - 2*padding) / (number_of_sliders + 1)) * (index + 1)  + padding));
  return result
}

let x_coordinates_of_sliders = get_x_coordinates_of_sliders(stage1.listOfSliders);

// draw three rectangles centered at the x coordinates of width 10%

let slider_width = 0.10

let slider_height = 0.90
x_coordinates_of_sliders.forEach((x,_) => {
  const rectangle = new Graphics();
  rectangle.beginFill(0xAA33BB)
  .drawRect(widthPosition(x) - widthPosition(slider_width/2), heightPosition(padding), widthPosition(slider_width),heightPosition(1 - 2*padding))
  .endFill();
  app.stage.addChild(rectangle);
})

// draw the boxes that would contain the slider positions

function get_coordinates_of_slider_positions(listOfSliders) {
  result = [];
  listOfSliders.forEach((_, index) => result.push(((1 - 2*padding) / (number_of_sliders + 1)) * (index + 1)  + padding));
  return result
}

let button_width = 0.05;
let button_height = 0.05;

function get_y_coordinates_of_buttons(listOfSliders) {
  result = [];
  listOfSliders.forEach((x, _ ) => 
  { 
    result.push(((1 - 2*padding) / (x.height + 1)) * (x.currPosition)  + padding)}
  );
  return result
}

let y_coordinates_of_buttons = get_y_coordinates_of_buttons(stage1.listOfSliders);

buttons = []
y_coordinates_of_buttons.forEach((x, index) => {
  const rectangle = new Graphics();
  rectangle.beginFill(0x000000)
  .drawRect(widthPosition(x_coordinates_of_sliders[index]) - widthPosition(button_width / 2) , heightPosition(x), widthPosition(button_width),heightPosition(button_height))
  .endFill();
  buttons.push(rectangle)
})

buttons.forEach((button) => app.stage.addChild(button))

// function for interaction with the buttons
buttons[0].interactive = true;
buttons[0].buttonMode = true;
buttons[0].on('pointerdown', function() {
  stage1.ExecuteTurn(0);
  let y_coordinates_of_buttons = get_y_coordinates_of_buttons(stage1.listOfSliders);
  // console.log("button[1] position before: " + buttons[1].y )

  // buttons[1].y = heightPosition(y_coordinates_of_buttons[1]);
  buttons[1].y = heightPosition(y_coordinates_of_buttons[1] - 0.5);
  buttons[2].y = heightPosition(y_coordinates_of_buttons[2] - 0.5);
  // buttons[1].widthPosition


  // console.log("button[1] y position after: " + buttons[1].y )
});


// stage1.ExecuteTurn(0);

// let y_coordinates_of_buttons2 = get_y_coordinates_of_buttons(stage1.listOfSliders);

// y_coordinates_of_buttons2.forEach((x, index) => {
//   const rectangle = new Graphics();
//   rectangle.beginFill(0x000000)
//   .drawRect(widthPosition(x_coordinates_of_sliders[index]) - widthPosition(button_width / 2) , heightPosition(x), widthPosition(button_width),heightPosition(button_height))
//   .endFill();
//   app.stage.addChild(rectangle);
// })
