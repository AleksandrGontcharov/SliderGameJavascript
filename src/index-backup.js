var PIXI = require('pixi.js');
const { Slider } = require('./Game/Slider');
const { Stage } = require('./Game/Stage');
import { drawBackground,windowHeight, windowWidth } from './Game/background';
import { Game } from './Game/Game';
import { drawArrow } from './Game/helpers'

 
const Application = PIXI.Application;
const app = new Application({ width: 500, 
                              height: 500, 
                              transparent: false,
                              antialias: true});



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

let stage2_slider1 = new Slider(7, 1, true);
let stage2_slider2 = new Slider(7, 3, false);
let stage2_slider3 = new Slider(7, 7, false);
let stage2_slider4 = new Slider(7, 5, false);
let stage2 = new Stage([stage2_slider1, stage2_slider2, stage2_slider3, stage2_slider4]);

let listOfStages = [stage1,stage2];

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

stageArrowItems.forEach((item) => {app.stage.addChild(item);
                                   item.interactive = true;
                                   item.buttonMode = true;
                                    });


function defineCallbacks(stage, stageArrowItems) {
  stageArrowItems.forEach((item, index) => {
    item.on('pointerdown', function() {
      stage.ExecuteTurn(index);
      // Remove all arrows
      stageArrowItems.forEach((item, _) => {
          app.stage.removeChild(item);
      });
      // redraw the arrows
      let newStageArrowItems = stage.drawArrows();
      newStageArrowItems.forEach((item) => {app.stage.addChild(item);
                                        item.interactive = true;
                                        item.buttonMode = true;
                                          });
      defineCallbacks(stage, newStageArrowItems)
    });
  });
}

defineCallbacks(stage2, stageArrowItems)