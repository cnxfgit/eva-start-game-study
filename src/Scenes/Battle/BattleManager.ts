import {Component} from '@eva/eva.js';
import TileMap from './GameObjects/TileMap';
import levels from '../../Levels';
import DataManager from '../../Runtime/DataManager';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../index';
import {TILE_HEIGHT, TILE_WIDTH} from './GameObjects/Tile';
import EventManager from '../../Runtime/EventManager';
import {EVENT_ENUM} from '../../Enums';
import Player from './GameObjects/Player';
import WoodenSkeleton from './GameObjects/WoodenSkeleton';
import PlayerManager from './GameObjects/Player/Scripts/PlayerManager';
import WoodenSkeletonManager from './GameObjects/WoodenSkeleton/Scripts/WoodenSkeletonManager';
import Door from './GameObjects/Door';
import DoorManager from './GameObjects/Door/Scripts/DoorManager';
import IronSkeleton from './GameObjects/IronSkeleton';
import IronSkeletonManager from './GameObjects/IronSkeleton/Scripts/IronSkeletonManager';
import Burst from "./GameObjects/Burst";
import BurstManager from "./GameObjects/Burst/Scripts/BurstManager";
import Spikes from "./GameObjects/Spikes";
import SpikesManager from "./GameObjects/Spikes/Scripts/SpikesManager";

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
    this.generateBursts();
    this.generateDoor();
    this.generateEnemies();
    this.generateSpikes();
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

  generateBursts(){
    const burst = Burst();
    this.gameObject.addChild(burst);
    DataManager.Instance.bursts.push(burst.getComponent(BurstManager));
  }

  generateDoor() {
    const door = Door();
    this.gameObject.addChild(door);
    DataManager.Instance.door = door.getComponent(DoorManager);
  }

  generatePlayer() {
    const player = Player();
    this.gameObject.addChild(player);
    DataManager.Instance.player = player.getComponent(PlayerManager);
  }

  generateSpikes(){
    const spikes = Spikes();
    this.gameObject.addChild(spikes);
    DataManager.Instance.spikes.push(spikes.getComponent(SpikesManager));
  }

  generateEnemies() {
    const enemy1 = WoodenSkeleton();
    this.gameObject.addChild(enemy1);
    DataManager.Instance.enemies.push(enemy1.getComponent(WoodenSkeletonManager));

    const enemy2 = IronSkeleton();
    this.gameObject.addChild(enemy2);
    DataManager.Instance.enemies.push(enemy2.getComponent(IronSkeletonManager));
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