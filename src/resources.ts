import { RESOURCE_TYPE } from '@eva/eva.js';
export default [
  {
    name: 'ctrl',
    type: RESOURCE_TYPE.SPRITE,
    src: {
      image: {
        type: 'png',
        url: './static/assets/ctrl/ctrl.png',
      },
      json: {
        type: 'json',
        url: './static/assets/ctrl/ctrl.json',
      }
    },
    preload: true,
  },
  {
    name: 'tile',
    type: RESOURCE_TYPE.SPRITE,
    src: {
      image: {
        type: 'png',
        url: './static/assets/bg/tile.png',
      },
      json: {
        type: 'json',
        url: './static/assets/bg/tile.json',
      }
    },
    preload: true,
  },
  {
    name: 'player_idle_top',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
      image: {
        type: 'png',
        url: './static/assets/player/idle_top.png',
      },
      json: {
        type: 'json',
        url: './static/assets/player/idle_top.json',
      }
    },
    preload: true,
  },
  {
    name: 'player_turn_left_top',
    type: RESOURCE_TYPE.SPRITE_ANIMATION,
    src: {
      image: {
        type: 'png',
        url: './static/assets/player/turn_left_top.png',
      },
      json: {
        type: 'json',
        url: './static/assets/player/turn_left_top.json',
      }
    },
    preload: true,
  },
];
