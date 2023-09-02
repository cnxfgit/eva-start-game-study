import {GameObject} from '@eva/eva.js';
import {Sprite} from '@eva/plugin-renderer-sprite';
import TileManager from './TileManager';
import {TILE_TYPE_ENUM} from '../../../../Enums';
import {Render} from "@eva/plugin-renderer-render";

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 32;

const Tile = (type: TILE_TYPE_ENUM,imgSrc: string, i: number, j: number) => {
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
  tile.addComponent(new Render({
    zIndex: 0,
  }))
  tile.addComponent(new Sprite({
    resource: 'tile',
    spriteName: imgSrc,
  }))

  tile.addComponent(new TileManager(type));

  return tile;
}

export default Tile;