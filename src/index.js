var PIXI = require('pixi.js');
const { Slider } = require('./Game/Slider');
const { Stage } = require('./Game/Stage');
import { drawBackground } from './Game/graphics/background';
import { windowHeight, windowWidth } from './Game/graphics/helpers';
import { startGame } from './Game/graphics/graphicsHelpers';
import { Game } from './Game/Game';


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

let stage3_slider1 = new Slider(11, 1, false);
let stage3_slider2 = new Slider(11, 2, false);
let stage3_slider3 = new Slider(11, 5, false);
let stage3_slider4 = new Slider(11, 4, false);
let stage3_slider5 = new Slider(11, 9, false);
let stage3 = new Stage([stage3_slider1, stage3_slider2, stage3_slider3, stage3_slider4, stage3_slider5]);



let listOfStages = [stage1, stage2, stage3];

let game = new Game(listOfStages);

// Begin game

startGame(game, 0, app);
