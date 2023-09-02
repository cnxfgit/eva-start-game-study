import {GameObject} from '@eva/eva.js';
import UndoButton from './UndoButton';

const Menu = () => {
  const menu = new GameObject('menu', {
    position: {
      x: 0,
      y: 34
    },
    origin: {
      x: 0.5,
      y: 0.5
    },
    anchor: {
      x: 0.5,
      y: 0
    },
  });
  menu.addChild(UndoButton());

  return menu;
}

export default Menu;