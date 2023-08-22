import {GameObject} from '@eva/eva.js';
import {TileMapManager} from './TileMapManager';



const TileMap = () => {
  const tileMap = new GameObject('TileMap');
  tileMap.addComponent(new TileMapManager());
  return tileMap;
}

export default TileMap;