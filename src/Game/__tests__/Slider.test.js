import { Slider } from '../Slider.js';

test('Slider Constructor Tests', () => {
    let sliderOne = new Slider(5, 3, true);
    // Test basic functionality of constructor
    expect(sliderOne.height).toBe(5);
    expect(sliderOne.currPosition).toBe(3);
    expect(sliderOne.direction).toBe(true);

    // Create objects that are not valid

    let sliderNotValid1 = new Slider(5, 7, true);
    expect(sliderNotValid1.currPosition).toBe(5);
    expect(sliderNotValid1.direction).toBe(false);
    
    let sliderNotValid2 = new Slider(5, -3, true);
    expect(sliderNotValid2.currPosition).toBe(1);
    expect(sliderNotValid2.direction).toBe(true);

    let sliderNotValid3 = new Slider(5, 5, true);
    expect(sliderNotValid3.currPosition).toBe(5);
    expect(sliderNotValid3.direction).toBe(false);

    let sliderNotValid4 = new Slider(5, 0, false);
    expect(sliderNotValid4.currPosition).toBe(1);
    expect(sliderNotValid4.direction).toBe(true);
  });

  test('Slider Constructor With Random Curr Position', () => {
    let sliderOne = new Slider(2);
    expect(sliderOne.height).toBe(2);
    expect(sliderOne.currPosition <= 5).toBe(true)
    expect(sliderOne.currPosition >= 1).toBe(true)
    let sliderTwo = new Slider(9);
    expect(sliderTwo.height).toBe(9);
    expect(sliderTwo.currPosition <= 9).toBe(true)
    expect(sliderTwo.currPosition >= 1).toBe(true)
  });

  test('Slider1 Next Tests', () => {

    // Test basic functionality of constructor
    let slider1 = new Slider(5, 3, true);
    slider1.Next();
    expect(slider1.currPosition).toBe(4);
    expect(slider1.direction).toBe(true);
  });

  test('Slider2 Next Tests', () => {
    let slider2 = new Slider(5, 3, false);
    slider2.Next();
    expect(slider2.currPosition).toBe(2);
    expect(slider2.direction).toBe(false);
});

test('Slider3 Next Tests', () => {

    let slider3 = new Slider(5, 5, false);
    slider3.Next();
    expect(slider3.currPosition).toBe(4);
    expect(slider3.direction).toBe(false);
});

test('Slider4 Next Tests', () => {

    let slider4 = new Slider(5, 0, true);
    slider4.Next();
    expect(slider4.currPosition).toBe(2);
    expect(slider4.direction).toBe(true);
});