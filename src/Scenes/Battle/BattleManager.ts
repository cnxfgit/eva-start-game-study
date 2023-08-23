import {Component} from '@eva/eva.js';
import TileMap from './GameObjects/TileMap';
import levels from '../../Levels';
import DataManager from '../../Runtime/DataManager';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../index';
import {TILE_HEIGHT, TILE_WIDTH} from './GameObjects/Tile';

export default class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字

  init() {
    const {levelIndex} = DataManager.Instance;
    const level = levels[`level${levelIndex}`]
    DataManager.Instance.mapInfo = level.mapInfo
    DataManager.Instance.mapColumnCount = level.mapInfo.length;
    DataManager.Instance.mapRowCount = level.mapInfo[0].length;
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
    const {mapColumnCount, mapRowCount} = DataManager.Instance;
    const disX = (SCREEN_WIDTH - (TILE_WIDTH * mapColumnCount)) / 2;
    const disY = (SCREEN_HEIGHT - (TILE_HEIGHT * mapRowCount)) / 2 - 50;
    this.gameObject.transform.position.x = disX;
    this.gameObject.transform.position.y = disY;
  }
}