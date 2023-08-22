import {GameObject} from '@eva/eva.js';
import {Sprite} from '@eva/plugin-renderer-sprite';
import {Event} from '@eva/plugin-renderer-event';
import {Transition} from '@eva/plugin-transition';

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

  const animation = button.addComponent(new Transition());
  animation.group = {
    small: [
      {
        name: 'scale.x',
        component: button.transform,
        values: [
          {
            time: 0,
            value: 1,
            tween: 'ease-out'
          },
          {
            time: 100,
            value: 0.9,
            tween: 'ease-in'
          }
        ]
      },
      {
        name: 'scale.y',
        component: button.transform,
        values: [
          {
            time: 0,
            value: 1,
            tween: 'ease-out'
          },
          {
            time: 100,
            value: 0.9,
            tween: 'ease-in'
          }
        ]
      }
    ],
    big: [
      {
        name: 'scale.x',
        component: button.transform,
        values: [
          {
            time: 0,
            value: 0.9,
            tween: 'ease-out'
          },
          {
            time: 100,
            value: 1,
            tween: 'ease-in'
          }
        ]
      },
      {
        name: 'scale.y',
        component: button.transform,
        values: [
          {
            time: 0,
            value: 0.9,
            tween: 'ease-out'
          },
          {
            time: 100,
            value: 1,
            tween: 'ease-in'
          }
        ]
      }
    ]
  }

  button.addComponent(new Sprite({
    resource: 'ctrl',
    spriteName: `ctrl (${index}).png`,
  }))

  const event = button.addComponent(new Event());
  event.on('touchstart', () => {
    animation.play('small')
  })

  const endHandler = () => {
    animation.play('big')
  };

  event.on('touchend', endHandler)
  event.on('touchendoutside', endHandler)

  return button;
}

export default ControllerButton;