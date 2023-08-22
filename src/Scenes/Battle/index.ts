import {Scene} from '@eva/eva.js';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../index';
import BackgroundColor from './GameObjects/BackgroundColor';
import Footer from './GameObjects/Footer';
import Controller from './GameObjects/Controller';
import TileMap from './GameObjects/TileMap';

const BattleScene = () => {
  const scene = new Scene('BattleScene', {
    size: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }
  });

  scene.addChild(BackgroundColor());
  scene.addChild(TileMap());
  scene.addChild(Controller());
  scene.addChild(Footer());

  return scene;
}

export default BattleScene;