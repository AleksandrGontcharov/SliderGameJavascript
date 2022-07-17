import { Stage } from '../classes/Stage.js';
import { Slider } from '../classes/Slider.js';

test('Stage Constructor Tests', () => {
  let listOfSliders = [new Slider(5, 3, true), new Slider(7, 1, true), new Slider(8, 2, false)];
  let stage = new Stage(listOfSliders);
  expect(stage.listOfSliders.length).toBe(3);
  expect(stage.listOfSliders[0].height).toBe(5);
  expect(stage.listOfSliders[0].currPosition).toBe(3);
  expect(stage.listOfSliders[0].direction).toBe(true);
  expect(stage.listOfSliders[1].height).toBe(7);
  expect(stage.listOfSliders[1].currPosition).toBe(1);
  expect(stage.listOfSliders[1].direction).toBe(true);
  expect(stage.listOfSliders[2].height).toBe(8);
  expect(stage.listOfSliders[2].currPosition).toBe(2);
  expect(stage.listOfSliders[2].direction).toBe(false);
  expect(1).toBe(1);
});

test('Stage ExecuteTurn Tests', () => {
  let listOfSliders = [new Slider(5, 3, true),
  new Slider(7, 4, true),
  new Slider(3, 2, false),
  new Slider(4, 3, false)
  ];
  let stage = new Stage(listOfSliders);
  stage.ExecuteTurn(1);
  expect(stage.listOfSliders[0].currPosition).toBe(3);
  expect(stage.listOfSliders[0].direction).toBe(true);
  expect(stage.listOfSliders[1].currPosition).toBe(5);
  expect(stage.listOfSliders[1].direction).toBe(true);
  expect(stage.listOfSliders[2].currPosition).toBe(1);
  expect(stage.listOfSliders[2].direction).toBe(true);
  expect(stage.listOfSliders[3].currPosition).toBe(2);
  expect(stage.listOfSliders[3].direction).toBe(false);
});

test('Stage ExecuteTurn Tests', () => {
  let listOfSliders = [new Slider(5, 3, true),
  new Slider(7, 4, true),
  new Slider(3, 2, false),
  new Slider(4, 3, false)
  ];
  let stage = new Stage(listOfSliders);
  stage.ExecuteTurn(4);
  expect(stage.listOfSliders[0].currPosition).toBe(4);
  expect(stage.listOfSliders[0].direction).toBe(true);
  expect(stage.listOfSliders[1].currPosition).toBe(5);
  expect(stage.listOfSliders[1].direction).toBe(true);
  expect(stage.listOfSliders[2].currPosition).toBe(1);
  expect(stage.listOfSliders[2].direction).toBe(true);
  expect(stage.listOfSliders[3].currPosition).toBe(3);
  expect(stage.listOfSliders[3].direction).toBe(false);

});

test('Stage IsWinning Tests', () => {
  let listOfSliders = [new Slider(5, 3, true),
  new Slider(5, 3, true),
  new Slider(5, 3, true),
  new Slider(5, 4, false)
  ];
  let stage = new Stage(listOfSliders);
  expect(stage.IsWinning()).toBe(false);
  stage.ExecuteTurn(4);
  expect(stage.IsWinning()).toBe(true);
  stage.ExecuteTurn(4);
  expect(stage.IsWinning()).toBe(false);
});