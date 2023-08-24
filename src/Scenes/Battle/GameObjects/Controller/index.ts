import {GameObject} from '@eva/eva.js';
import ControllerButton from './ControllerButton';
import {CONTROLLER_ENUM} from "../../../../Enums";


const Controller = () => {
  const controller = new GameObject('controller', {
    position: {
      x: 0,
      y: -140,
    },
    origin: {
      x: 0.5,
      y: 0.5,
    },
    anchor: {
      x: 0.5,
      y: 1,
    }
  })

  controller.addChild(ControllerButton(CONTROLLER_ENUM.TURNLEFT, 1));
  controller.addChild(ControllerButton(CONTROLLER_ENUM.LEFT,2));
  controller.addChild(ControllerButton(CONTROLLER_ENUM.TOP,3));
  controller.addChild(ControllerButton(CONTROLLER_ENUM.BOTTOM,4));
  controller.addChild(ControllerButton(CONTROLLER_ENUM.TURNRIGHT,5));
  controller.addChild(ControllerButton(CONTROLLER_ENUM.RIGHT,6));

  return controller;
}

export default Controller;