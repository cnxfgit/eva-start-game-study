import {Component} from '@eva/eva.js';
import TileMap from './GameObjects/TileMap';
import levels, {ILevel} from '../../Levels';
import DataManager, {IRecord} from '../../Runtime/DataManager';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from '../../index';
import {TILE_HEIGHT, TILE_WIDTH} from './GameObjects/Tile';
import EventManager from '../../Runtime/EventManager';
import {DIRECTION_ENUM, ENTITY_STATE_ENUM, ENTITY_TYPE_ENUM, EVENT_ENUM, SHAKE_TYPE_ENUM} from '../../Enums';
import Player from './GameObjects/Player';
import WoodenSkeleton from './GameObjects/WoodenSkeleton';
import PlayerManager from './GameObjects/Player/Scripts/PlayerManager';
import WoodenSkeletonManager from './GameObjects/WoodenSkeleton/Scripts/WoodenSkeletonManager';
import Door from './GameObjects/Door';
import DoorManager from './GameObjects/Door/Scripts/DoorManager';
import IronSkeleton from './GameObjects/IronSkeleton';
import IronSkeletonManager from './GameObjects/IronSkeleton/Scripts/IronSkeletonManager';
import Burst from './GameObjects/Burst';
import BurstManager from './GameObjects/Burst/Scripts/BurstManager';
import Spikes from './GameObjects/Spikes';
import SpikesManager from './GameObjects/Spikes/Scripts/SpikesManager';
import Smoke from './GameObjects/Smoke';
import SmokeManager from './GameObjects/Smoke/Scripts/SmokeManager';
import FaderManager from '../../Runtime/FaderManager';

export default class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字

  level: ILevel;
  isShaking: boolean = false;
  oldFrame: number = 0;
  oldPos: { x: number, y: number } = {x: 0, y: 0}
  shakeType: SHAKE_TYPE_ENUM;
  hasInit: boolean = false;

  init() {
    DataManager.Instance.levelIndex = 1;

    EventManager.Instance.on(EVENT_ENUM.NEXT_LEVEL, this.nextLevel, this)
    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.checkArrived, this)
    EventManager.Instance.on(EVENT_ENUM.SHOW_SMOKE, this.generateSmoke, this);
    EventManager.Instance.on(EVENT_ENUM.SCREEN_SHAKE, this.onShake, this);
    EventManager.Instance.on(EVENT_ENUM.RECORD_STEP, this.record, this);
    EventManager.Instance.on(EVENT_ENUM.REVOKE_STEP, this.revoke, this);
  }

  start() {
    this.initLevel();
  }

  update() {
    this.onShakeUpdate();
  }

  onShake(shakeType: SHAKE_TYPE_ENUM) {
    if (this.isShaking) {
      return;
    }
    this.oldFrame = DataManager.Instance.frame;
    this.isShaking = true;
    const {x, y} = this.gameObject.transform.position;
    this.oldPos.x = x;
    this.oldPos.y = y;
    this.shakeType = shakeType;
  }

  onShakeUpdate() {
    if (this.isShaking) {
      const duration = 200;
      const curSecond = (DataManager.Instance.frame - this.oldFrame) / 60;
      const totalSecond = duration / 1000;
      const amount = 1.6;
      const frequency = 12;
      const offset = amount * Math.sin(frequency * Math.PI * curSecond);
      if (curSecond < totalSecond) {
        if (this.shakeType === SHAKE_TYPE_ENUM.TOP) {
          this.gameObject.transform.position.y = this.oldPos.y - offset;
        } else if (this.shakeType === SHAKE_TYPE_ENUM.BOTTOM) {
          this.gameObject.transform.position.y = this.oldPos.y + offset;
        } else if (this.shakeType === SHAKE_TYPE_ENUM.LEFT) {
          this.gameObject.transform.position.x = this.oldPos.x - offset;
        } else if (this.shakeType === SHAKE_TYPE_ENUM.RIGHT) {
          this.gameObject.transform.position.x = this.oldPos.x + offset;
        }
      } else {
        this.isShaking = false;
        this.gameObject.transform.position.x = this.oldPos.x;
        this.gameObject.transform.position.y = this.oldPos.y;
      }
    }
  }

  async initLevel() {
    const level = levels[`level${DataManager.Instance.levelIndex}`]
    if (level) {
      if (this.hasInit) {
        await FaderManager.Instance.fadeIn();
      } else {
        await FaderManager.Instance.mask();
      }

      this.clearLevel();
      this.level = level;
      DataManager.Instance.mapInfo = level.mapInfo;
      DataManager.Instance.mapRowCount = level.mapInfo.length;
      DataManager.Instance.mapColumnCount = level.mapInfo[0].length;
      this.generateTileMap();
      this.generateBursts();
      this.generateDoor();
      this.generateEnemies();
      this.generateSpikes();
      this.generatePlayer();
      await FaderManager.Instance.fadeOut();
    }
  }

  clearLevel() {
    Array.from(this.gameObject.transform.children).forEach(({gameObject}) => {
      gameObject.destroy();
    });

    DataManager.Instance.reset();
  }

  generateTileMap() {
    this.gameObject.addChild(TileMap());
    this.adaptPos();
  }

  generateBursts() {
    DataManager.Instance.bursts = this.level.bursts.map(item => {
      const burst = Burst(item);
      this.gameObject.addChild(burst);
      return burst.getComponent(BurstManager);
    })
  }

  generateDoor() {
    const door = Door(this.level.door);
    this.gameObject.addChild(door);
    DataManager.Instance.door = door.getComponent(DoorManager);
  }

  generatePlayer() {
    const player = Player(this.level.player);
    this.gameObject.addChild(player);
    DataManager.Instance.player = player.getComponent(PlayerManager);
  }

  generateSpikes() {
    DataManager.Instance.spikes = this.level.spikes.map(item => {
      const spikes = Spikes(item);
      this.gameObject.addChild(spikes);
      return spikes.getComponent(SpikesManager);
    });
  }

  generateSmoke(x: number, y: number, direction: DIRECTION_ENUM) {
    const item = DataManager.Instance.smokes
      .find(smoke => smoke.state === ENTITY_STATE_ENUM.DEATH);
    if (item) {
      item.x = x;
      item.y = y;
      item.direction = direction;
      item.state = ENTITY_STATE_ENUM.IDLE;
    } else {
      const smoke = Smoke({
        x,
        y,
        direction,
        type: ENTITY_TYPE_ENUM.SMOKE,
        state: ENTITY_STATE_ENUM.IDLE,
      });
      this.gameObject.addChild(smoke);

      DataManager.Instance.smokes.push(smoke.getComponent(SmokeManager));
    }
  }

  generateEnemies() {
    DataManager.Instance.enemies = this.level.enemies.map(item => {
      if (item.type === ENTITY_TYPE_ENUM.SKELETON_WOODEN) {
        const woodenSkeleton = WoodenSkeleton(item);
        this.gameObject.addChild(woodenSkeleton);
        return woodenSkeleton.getComponent(WoodenSkeletonManager)
      } else if (item.type === ENTITY_TYPE_ENUM.SKELETON_IRON) {
        const ironSkeleton = IronSkeleton(item);
        this.gameObject.addChild(ironSkeleton);
        return ironSkeleton.getComponent(IronSkeletonManager);
      }
    });
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

  checkArrived() {
    const {player: {x: playerX, y: playerY}, door: {x: doorX, y: doorY, state: doorState}}
      = DataManager.Instance;
    if (playerX === doorX && playerY === doorY && doorState === ENTITY_STATE_ENUM.DEATH) {
      EventManager.Instance.emit(EVENT_ENUM.NEXT_LEVEL);
    }
  }

  record() {
    const item: IRecord = {
      player: {
        x: DataManager.Instance.player.x,
        y: DataManager.Instance.player.y,
        direction: DataManager.Instance.player.direction,
        type: DataManager.Instance.player.type,
        state: DataManager.Instance.player.state === ENTITY_STATE_ENUM.IDLE ||
        DataManager.Instance.player.state === ENTITY_STATE_ENUM.DEATH ||
        DataManager.Instance.player.state === ENTITY_STATE_ENUM.AIRDEATH
          ? DataManager.Instance.player.state : ENTITY_STATE_ENUM.IDLE,
      },
      door: {
        x: DataManager.Instance.door.x,
        y: DataManager.Instance.door.y,
        direction: DataManager.Instance.door.direction,
        type: DataManager.Instance.door.type,
        state: DataManager.Instance.door.state,
      },
      enemies: DataManager.Instance.enemies.map(({x, y, state, type, direction}) => {
        return {x, y, type, direction, state}
      }),
      bursts: DataManager.Instance.bursts.map(({x, y, state, type, direction}) => {
        return {x, y, type, direction, state}
      }),
      spikes: DataManager.Instance.spikes.map(({x, y, type, count}) => {
        return {x, y, type, count}
      }),
    };
    DataManager.Instance.records.push(item);
  }

  revoke() {
    const record = DataManager.Instance.records.pop()
    if (record) {
      const {player, spikes, enemies, door, bursts} = record;
      DataManager.Instance.player.x = DataManager.Instance.player.targetX = player.x;
      DataManager.Instance.player.y = DataManager.Instance.player.targetY = player.y;
      DataManager.Instance.player.state = player.state;
      DataManager.Instance.player.direction = player.direction;

      DataManager.Instance.door.x = door.x;
      DataManager.Instance.door.y = door.y;
      DataManager.Instance.door.state = door.state;
      DataManager.Instance.door.direction = door.direction;

      for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        DataManager.Instance.enemies[i].x = enemy.x;
        DataManager.Instance.enemies[i].y = enemy.y;
        DataManager.Instance.enemies[i].state = enemy.state;
        DataManager.Instance.enemies[i].direction = enemy.direction;
      }

      for (let i = 0; i < bursts.length; i++) {
        const burst = bursts[i];
        DataManager.Instance.bursts[i].x = burst.x;
        DataManager.Instance.bursts[i].y = burst.y;
        DataManager.Instance.bursts[i].state = burst.state;
        DataManager.Instance.bursts[i].direction = burst.direction;
      }

      for (let i = 0; i < spikes.length; i++) {
        const item = spikes[i];
        DataManager.Instance.spikes[i].x = item.x;
        DataManager.Instance.spikes[i].y = item.y;
        DataManager.Instance.spikes[i].count = item.count;
      }
    }
  }
}