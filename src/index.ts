import resources from './resources';

import { Game, resource } from '@eva/eva.js';
import { RendererSystem } from '@eva/plugin-renderer';
import { ImgSystem } from '@eva/plugin-renderer-img';
import { EventSystem } from '@eva/plugin-renderer-event';
import { SpriteAnimationSystem } from '@eva/plugin-renderer-sprite-animation';
import { RenderSystem } from '@eva/plugin-renderer-render';
import { TransitionSystem } from '@eva/plugin-transition';
import { GraphicsSystem } from '@eva/plugin-renderer-graphics';
import { TextSystem } from '@eva/plugin-renderer-text';
import BattleScene from './Scenes/Battle';
import {SpriteSystem} from '@eva/plugin-renderer-sprite';
import FaderManager from './Runtime/FaderManager';
import DataManager from "./Runtime/DataManager";

export const SCREEN_WIDTH = window.innerWidth;
export const SCREEN_HEIGHT = window.innerHeight;

resource.addResource(resources);

const game = new Game({
  systems: [
    new RendererSystem({
      canvas: document.querySelector('#canvas'),
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      antialias: true,
      enableScroll: false,
    }),
    new ImgSystem(),
    new TransitionSystem(),
    new SpriteAnimationSystem(),
    new RenderSystem(),
    new EventSystem(),
    new GraphicsSystem(),
    new TextSystem(),
    new SpriteSystem(),
  ],
});


game.loadScene({
  scene: BattleScene()
})

game.ticker.add(() => {
  DataManager.Instance.frame++;
  FaderManager.Instance.update();
})