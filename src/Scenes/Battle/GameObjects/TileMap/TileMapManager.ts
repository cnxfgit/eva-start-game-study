import {Component} from '@eva/eva.js';
import levels from '../../../../Levels';
import Tile from '../Tile';



export class TileMapManager extends Component{
  static componentName = 'TileMapManager';

  init(){
    this.initTile();
  }
  
  initTile(){
    const {level1: {mapInfo}} = levels;

    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i];
      for (let j = 0; j < column.length; j++) {
        const item = column[j];
        if (item.src === null || item.type === null) {
          continue;
        }

        const imgSrc = `bg (${item.src}).png`
        const tile = Tile(imgSrc, i, j);

        this.gameObject.addChild(tile);
      }
    }
  }
}