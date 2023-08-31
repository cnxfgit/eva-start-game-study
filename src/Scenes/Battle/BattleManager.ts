import {Component} from '@eva/eva.js';
import TileMap from './GameObjects/TileMap';
import levels from '../../Levels';
import DataManager from '../../Runtime/DataManager';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../index';
import {TILE_HEIGHT, TILE_WIDTH} from './GameObjects/Tile';
import EventManager from '../../Runtime/EventManager';
import {EVENT_ENUM} from '../../Enums';
import Player from './GameObjects/Player';
import WoodenSkeleton from "./GameObjects/WoodenSkeleton";
import PlayerManager from "./GameObjects/Player/Scripts/PlayerManager";
import WoodenSkeletonManager from "./GameObjects/WoodenSkeleton/Scripts/WoodenSkeletonManager";

export default class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字

  init() {
    EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this)
    this.initLevel();
  }

  initLevel() {
    this.clearLevel();
    const {levelIndex} = DataManager.Instance;
    const level = levels[`level${levelIndex}`];
    DataManager.Instance.mapInfo = level.mapInfo;
    DataManager.Instance.mapRowCount = level.mapInfo.length;
    DataManager.Instance.mapColumnCount = level.mapInfo[0].length;
    this.generateTileMap();
    this.generateEnemies();
    this.generatePlayer();
  }

  clearLevel() {
    this.gameObject.transform.children.forEach(({gameObject}) => {
      gameObject.destroy();
    });

    DataManager.Instance.reset();
  }

  generateTileMap() {
    this.gameObject.addChild(TileMap());
    this.adaptPos();
  }

  generatePlayer() {
    const player = Player();
    this.gameObject.addChild(player);
    DataManager.Instance.player = player.getComponent(PlayerManager);
  }

  generateEnemies() {
    const enemy = WoodenSkeleton();
    this.gameObject.addChild(enemy);
    DataManager.Instance.enemies.push(enemy.getComponent(WoodenSkeletonManager));
  }

  adaptPos() {
    const {mapColumnCount, mapRowCount} = DataManager.Instance;
    const disX = (SCREEN_WIDTH - (TILE_WIDTH * mapRowCount)) / 2;
    const disY = (SCREEN_HEIGHT - (TILE_HEIGHT * mapColumnCount)) / 2 - 50;
    this.gameObject.transform.position.x = disX;
    this.gameObject.transform.position.y = disY;
  }

  nextLevel() {
    DataManager.Instance.levelIndex++;
    this.initLevel();
  }
}