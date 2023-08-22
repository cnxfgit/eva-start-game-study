import {GameObject} from '@eva/eva.js';
import levels from '../../../../Levels';
import {Sprite} from "@eva/plugin-renderer-sprite";

const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;

const TileMap = () => {
  const tileMap = new GameObject('TileMap');
  const {level1: {mapInfo}} = levels;

  for (let i = 0; i < mapInfo.length; i++) {
    const column = mapInfo[i];
    for (let j = 0; j < column.length; j++) {
      const item = column[j];
      if (item.src === null || item.type === null) {
        continue;
      }

      const imgSrc = `bg (${item.src}).png`
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

      tileMap.addChild(tile);
    }
  }

  return tileMap;
}

export default TileMap;