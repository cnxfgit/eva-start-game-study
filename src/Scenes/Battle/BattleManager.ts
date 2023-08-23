import {Component} from '@eva/eva.js';
import TileMap from './GameObjects/TileMap';
import levels from '../../Levels';
import DataManagerInstance from '../../Runtime/DataManager';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../index';
import {TILE_HEIGHT, TILE_WIDTH} from './GameObjects/Tile';

export class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字

  init() {
    const {levelIndex} = DataManagerInstance;
    const level = levels[`level${levelIndex}`]
    DataManagerInstance.mapInfo = level.mapInfo
    DataManagerInstance.mapColumnCount = level.mapInfo.length;
    DataManagerInstance.mapRowCount = level.mapInfo[0].length;
    this.initLevel();
  }

  initLevel() {
    this.generateTileMap()
  }

  generateTileMap() {
    this.gameObject.addChild(TileMap());
    this.adaptPos();
  }

  adaptPos() {
    const {mapColumnCount, mapRowCount} = DataManagerInstance;
    const disX = (SCREEN_WIDTH - (TILE_WIDTH * mapColumnCount)) / 2;
    const disY = (SCREEN_HEIGHT - (TILE_HEIGHT * mapRowCount)) / 2 - 50;
    this.gameObject.transform.position.x = disX;
    this.gameObject.transform.position.y = disY;
  }
}