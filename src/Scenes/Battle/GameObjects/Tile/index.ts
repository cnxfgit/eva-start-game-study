import {GameObject} from '@eva/eva.js';
import {Sprite} from '@eva/plugin-renderer-sprite';

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 32;

const Tile = (imgSrc: string, i: number, j: number) => {
  const tile = new GameObject('tile', {
    size: {
      width: TILE_WIDTH,
      height: TILE_HEIGHT,
    },
    position: {
      x: i * TILE_WIDTH,
      y: j * TILE_HEIGHT,
    }
  })

  tile.addComponent(new Sprite({
    resource: 'tile',
    spriteName: imgSrc,
  }))

  return tile;
}

export default Tile;