import {GameObject} from '@eva/eva.js';
import TileMapManager from './TileMapManager';
import {Render} from "@eva/plugin-renderer-render";



const TileMap = () => {
  const tileMap = new GameObject('TileMap');
  tileMap.addComponent(new Render({
    zIndex: 0,
    sortableChildren: true,
  }))
  tileMap.addComponent(new TileMapManager());
  return tileMap;
}

export default TileMap;