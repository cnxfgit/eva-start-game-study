import {GameObject, Scene} from '@eva/eva.js';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../index';
import BackgroundColor from './GameObjects/BackgroundColor';
import Footer from './GameObjects/Footer';
import Controller from './GameObjects/Controller';
import BattleManager from './BattleManager';
import {Render} from '@eva/plugin-renderer-render';
import FaderManager from '../../Runtime/FaderManager';

const BattleScene = () => {
  const scene = new Scene('BattleScene', {
    size: {
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT
    }
  });

  scene.addChild(BackgroundColor());
  scene.addChild(Controller());

  const stage = new GameObject('stage');
  stage.addComponent(new Render({
    sortableChildren: true,
  }));
  stage.addComponent(new BattleManager());

  scene.addChild(stage);
  scene.addChild(Footer());
  scene.addChild(FaderManager.Instance.createFader());

  return scene;
}

export default BattleScene;