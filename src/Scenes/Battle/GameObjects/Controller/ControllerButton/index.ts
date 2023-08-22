import {GameObject} from '@eva/eva.js';
import {Sprite} from '@eva/plugin-renderer-sprite';

const CTRL_WIDTH = 70;
const CTRL_HEIGHT = 60;
const GAP_HEIGHT = 3;

const getPosition = (index: number) => {
  const xAxis = Math.floor((index - 1) / 2);
  const yAxis = (index - 1) % 2;
  return {
    x: (xAxis - 1) * CTRL_WIDTH,
    y: yAxis * (CTRL_HEIGHT + GAP_HEIGHT),
  }
}

const ControllerButton = (index: number) => {
  const button = new GameObject('button', {
    size: {
      width: CTRL_WIDTH,
      height: CTRL_HEIGHT,
    },
    position: getPosition(index),
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 1,
    }
  })
  button.addComponent(new Sprite({
    resource: 'ctrl',
    spriteName: `ctrl (${index}).png`,
  }))


  return button;
}

export default ControllerButton;