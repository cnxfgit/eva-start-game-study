import {DIRECTION_ENUM, ENTITY_STATE_ENUM, EVENT_ENUM,} from '../../../../../Enums';
import EntityManager from '../../../../../Base/EntityManager';
import WoodenSkeletonStateMachine from './WoodenSkeletonStateMachine';
import EventManager from "../../../../../Runtime/EventManager";
import DataManager from "../../../../../Runtime/DataManager";


export default class WoodenSkeletonManager extends EntityManager {
  static componentName = 'WoodenSkeletonManager';

  init() {
    this.fsm = this.gameObject.addComponent(new WoodenSkeletonStateMachine());
    this.x = 7;
    this.y = 6;
    this.state = ENTITY_STATE_ENUM.IDLE;
    this.direction = DIRECTION_ENUM.TOP;

    EventManager.Instance.on(EVENT_ENUM.PLAYER_MOVE_END, this.onChangeDirection, this);
  }

  start() {
    this.onChangeDirection(true)
  }

  onChangeDirection(init: boolean) {
    const {x: playerX, y: playerY} = DataManager.Instance.player;

    const disX = Math.abs(this.x - playerX);
    const disY = Math.abs(this.x - playerY);

    if (disY === disX && !init) return;

    if (playerX > this.x && playerY < this.y) {
      // 第一象限
      this.direction = disX > disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.TOP;
    } else if (playerX < this.x && playerY < this.y) {
      // 第二象限
      this.direction = disX > disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.TOP;
    } else if (playerX < this.x && playerY > this.y) {
      // 第三象限
      this.direction = disX > disY ? DIRECTION_ENUM.LEFT : DIRECTION_ENUM.BOTTOM;
    } else if (playerX > this.x && playerY > this.y) {
      // 第四象限
      this.direction = disX > disY ? DIRECTION_ENUM.RIGHT : DIRECTION_ENUM.BOTTOM;
    }
  }
}