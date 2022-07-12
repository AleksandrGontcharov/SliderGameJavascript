var PIXI = require('pixi.js');
const { Slider } = require('./Game/Slider');
const { Stage } = require('./Game/Stage');
import { drawBackground } from './Game/background';
import { windowHeight, windowWidth, margin_y, slider_padding } from './Game/helpers';
import { Game } from './Game/Game';
import { drawArrow } from './Game/helpers'


const Application = PIXI.Application;
const app = new Application({
  width: 500,
  height: 500,
  transparent: false,
  antialias: true
});

app.renderer.backgroundColor = 0x060812;

app.renderer.resize(windowWidth, windowHeight);

app.renderer.view.style.position = "absolute";

document.body.appendChild(app.view);

// Render the background

let backgroundItems = drawBackground();
backgroundItems.forEach((item) => app.stage.addChild(item))

// Define the game here

// Generate the first Stage of the game with 3 sliders of height 5
let stage1_slider1 = new Slider(5, 1, true);
let stage1_slider2 = new Slider(5, 3, false);
let stage1_slider3 = new Slider(5, 5, false);
let stage1 = new Stage([stage1_slider1, stage1_slider2, stage1_slider3]);

let stage2_slider1 = new Slider(7, 7, false);
let stage2_slider2 = new Slider(7, 3, false);
let stage2_slider3 = new Slider(7, 7, false);
let stage2_slider4 = new Slider(7, 5, false);
let stage2 = new Stage([stage2_slider1, stage2_slider2, stage2_slider3, stage2_slider4]);

let listOfStages = [stage1, stage2];

let game = new Game(listOfStages);

// Begin game

// game.listOfStages.forEach(
// for each stage we
// draw the stage setting 

// draw the arrows

// do a while loop until the person wins

// delete the stage setting and arrows
// move on to next stage
// )


// Stage 1
console.log(stage1.listOfSliders)
// draw the stage setting 
let stageSettingItems = stage2.drawSetting();

stageSettingItems.forEach((item) => app.stage.addChild(item))
// draw the arrows
let stageArrowItems = stage2.drawArrows();
let stageArrowPositions = stage2.getArrowsPositions();

function getSpritesFromGraphics(listOfGraphics) {
  let result = [];
  listOfGraphics.forEach((item) => {

    let texture = app.renderer.generateTexture(item);
    let sprite = new PIXI.Sprite(texture);

    result.push(sprite);
  })
  return result;
}

let stageArrowSprites = getSpritesFromGraphics(stageArrowItems);

stageArrowSprites.forEach((item, index) => {
  app.stage.addChild(item);
  item.anchor.x = 0.5;
  item.anchor.y = 0.5;
  item.position.x = stageArrowPositions[index][0];
  item.position.y = stageArrowPositions[index][1];
  item.interactive = true;
  item.buttonMode = true;
});

app.ticker.add(() => {
  animateArrow1(stageArrowSprites, stage2);
});

function animateArrow1(stageArrowSprites, stage) {
  // stageArrowSprites[0].rotation += 0.01;
  stageArrowSprites.forEach((item, index) => {
    let currentSpritePosition = getCurrPositionFromSprite(item, stage, index);
    let currentSliderPosition = stage.listOfSliders[index].currPosition;

    // console.log("start: Sprite: " + currentSpritePosition + " Slider: " + currentSliderPosition);
    if (currentSpritePosition != currentSliderPosition) {
      let new_y_c = stage.getArrowsPositions()[index][1];

      // console.log(stage.listOfSliders[0].currPosition, currentSpritePosition);

      if (item.position.y < new_y_c) {
        console.log("moving down " + item.position.y);
        item.position.y += 3;
        if (item.position.y > new_y_c) {
          item.position.y = new_y_c;
          console.log("moving up " + item.position.y + " new position " + new_y_c);
        }
      }
      if (item.position.y > new_y_c) {
        console.log("moving up " + item.position.y + " new position " + new_y_c);
        item.position.y -= 3;
        if (item.position.y < new_y_c) {
          item.position.y = new_y_c;
          console.log("moving up " + item.position.y + " new position " + new_y_c);
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



function defineCallbacks(stage, stageArrowSprites) {
  stageArrowSprites.forEach((item, index) => {
    item.on('pointerdown', function () {
      app.ticker.start();
      stage.ExecuteTurn(index);
      // Remove all arrows
      stageArrowSprites.forEach((item, index2) => {
        if (index != index2) {
          let newStageArrowPositions = stage.getArrowsPositions();


          if (index2 == 0) {
            console.log("position of Slider " + (index2 + 1) + " is " + stage.listOfSliders[index2].currPosition);
            console.log("Y OLD position of Slider " + (index2 + 1) + " is " + item.position.y);
            console.log("Y NEW position of Slider " + (index2 + 1) + " is " + newStageArrowPositions[index2][1]);
          };

          // I want to animate the arrow to the new position
          // item.position.y = newStageArrowPositions[index2][1];
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

defineCallbacks(stage2, stageArrowSprites);