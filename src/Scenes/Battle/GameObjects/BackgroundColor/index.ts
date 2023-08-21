import {GameObject} from '@eva/eva.js';
import {Graphics} from '@eva/plugin-renderer-graphics';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../../../index';

const BackgroundColor = () => {
  const backgroundColor = new GameObject('backgroundColor', {});
  const graphics = backgroundColor.addComponent(new Graphics());
  graphics.graphics.beginFill(0x140a27, 1);
  graphics.graphics.drawRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
  graphics.graphics.endFill();
  
  return backgroundColor;
}

export default BackgroundColor;