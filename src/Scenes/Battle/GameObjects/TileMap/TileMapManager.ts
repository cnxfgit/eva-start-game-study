import {Component} from '@eva/eva.js';
import Tile from '../Tile';
import {randomByRange} from '../../../../Utils/inedx';
import DataManager from '../../../../Runtime/DataManager';
import TileManager from "../Tile/TileManager";


export default class TileMapManager extends Component {
  static componentName = 'TileMapManager';

  init() {
    this.initTile();
  }

  initTile() {
    const {mapInfo} = DataManager.Instance;
    DataManager.Instance.tileInfo = [];
    for (let i = 0; i < mapInfo.length; i++) {
      const column = mapInfo[i];
      DataManager.Instance.tileInfo[i] = [];
      for (let j = 0; j < column.length; j++) {
        const item = column[j];
        if (item.src === null || item.type === null) {
          continue;
        }

        let number = item.src;
        if ((number === 1 || number === 5 || number === 9) && i % 2 === 0 && j % 2 === 0) {
          number += randomByRange(0, 4);
        }

        const imgSrc = `bg (${number}).png`
        const type = item.type;
        const tile = Tile(type, imgSrc, i, j);

        this.gameObject.addChild(tile);
        DataManager.Instance.tileInfo[i][j] = tile.getComponent(TileManager);
      }
    }
  }
}