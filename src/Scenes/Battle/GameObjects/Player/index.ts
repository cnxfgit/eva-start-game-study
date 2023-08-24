import {GameObject} from '@eva/eva.js';
import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';

export const ENTITY_WIDTH = 128;
export const ENTITY_HEIGHT = 128;

export const ANIMATION_SPEED = 1000 / 8;

const Player = () => {
  const player = new GameObject('player', {
    size: {
      width: ENTITY_WIDTH,
      height: ENTITY_HEIGHT,
    }
  })

  const spriteAnimation = player.addComponent(new SpriteAnimation({
    resource: 'player_idle_top',
    speed: ANIMATION_SPEED,
    forwards: true,
    autoPlay: false,
  }));

  spriteAnimation.play();

  return player;
}

export default Player;