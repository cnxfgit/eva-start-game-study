import {Component} from '@eva/eva.js';
import Tile from '../Tile';
import DataManagerInstance from '../../../../Runtime/DataManager';

const randomByRange = (start: number, end: number) => {
  return Math.floor(Math.random() * (start + (end - start)));
}

export class TileMapManager extends Component {
  static componentName = 'TileMapManager';

  init() {
    this.initTile();
  }

  initTile() {
    const {mapInfo} = DataManagerInstance;
    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i];
      for (let j = 0; j < column.length; j++) {
        const item = column[j];
        if (item.src === null || item.type === null) {
          continue;
        }

        let number = item.src;
        if ((number === 1 || number === 5 || number === 9) && i%2 === 0 &&j%2===0) {
          number += randomByRange(0, 4);
        }

        const imgSrc = `bg (${number}).png`
        const tile = Tile(imgSrc, i, j);

        this.gameObject.addChild(tile);
      }
    }
  }
}