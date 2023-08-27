import {Component} from '@eva/eva.js';
import EventManager from '../../../../../Runtime/EventManager';
import {CONTROLLER_ENUM, EVENT_ENUM, PARAMS_NAME_ENUM} from '../../../../../Enums';
import {TILE_HEIGHT, TILE_WIDTH} from '../../Tile';
import PlayerStateMachine from './PlayerStateMachine';

export class PlayerManager extends Component {
  static componentName = 'PlayerManager';

  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed = 1 / 10;
  fsm: PlayerStateMachine;

  init() {
    this.fsm = this.gameObject.addComponent(new PlayerStateMachine());
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.move, this);
    this.fsm.setParams(PARAMS_NAME_ENUM.IDLE, true);
  }

  update() {
    this.updateXY();
    this.gameObject.transform.position.x = this.x * TILE_WIDTH - 1.5 * TILE_WIDTH;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT - 1.5 * TILE_HEIGHT;
  }

  updateXY() {
    if (this.targetX < this.x) {
      this.x -= this.speed;
    } else if (this.targetX > this.x) {
      this.x += this.speed;
    }

    if (this.targetY < this.y) {
      this.y -= this.speed;
    } else if (this.targetY > this.y) {
      this.y += this.speed;
    }

    if (Math.abs(this.targetX - this.x) < 0.01 && Math.abs(this.targetY - this.y) < 0.01) {
      this.x = this.targetX;
      this.y = this.targetY;
    }
  }

  move(inputDirection: CONTROLLER_ENUM) {
    if (inputDirection === CONTROLLER_ENUM.TOP) {
      this.targetY -= 1;
    } else if (inputDirection === CONTROLLER_ENUM.BOTTOM) {
      this.targetY += 1;
    } else if (inputDirection === CONTROLLER_ENUM.LEFT) {
      this.targetX -= 1;
    } else if (inputDirection === CONTROLLER_ENUM.RIGHT) {
      this.targetX += 1;
    } else if (inputDirection === CONTROLLER_ENUM.TURNLEFT) {
      this.fsm.setParams(PARAMS_NAME_ENUM.TURNLEFT, true);
    }
  }
}