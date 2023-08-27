import {Component} from '@eva/eva.js';
import EventManager from '../../../../../Runtime/EventManager';
import {
  CONTROLLER_ENUM,
  DIRECTION_ENUM,
  DIRECTION_ORDER_ENUM,
  ENTITY_STATE_ENUM,
  EVENT_ENUM,
  PARAMS_NAME_ENUM
} from '../../../../../Enums';
import {TILE_HEIGHT, TILE_WIDTH} from '../../Tile';
import PlayerStateMachine from './PlayerStateMachine';

export class PlayerManager extends Component {
  static componentName = 'PlayerManager';

  x: number;
  y: number;
  targetX: number;
  targetY: number;
  readonly speed = 1 / 10;
  private _direction: DIRECTION_ENUM;
  private _state: ENTITY_STATE_ENUM;
  fsm: PlayerStateMachine;

  get direction() {
    return this._direction;
  }

  set direction(newDirection) {
    this._direction = newDirection;
    this.fsm.setParams(PARAMS_NAME_ENUM.DIRECTION, DIRECTION_ORDER_ENUM[newDirection]);
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
    this.fsm.setParams(newState, true);
  }

  init() {
    this.fsm = this.gameObject.addComponent(new PlayerStateMachine());
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.move, this);
    this.state = ENTITY_STATE_ENUM.IDLE;
    this.direction = DIRECTION_ENUM.TOP;
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
      this.state = ENTITY_STATE_ENUM.TURNLEFT;
      if (this.direction === DIRECTION_ENUM.TOP) {
        this.direction = DIRECTION_ENUM.LEFT;
      } else if (this.direction === DIRECTION_ENUM.LEFT) {
        this.direction = DIRECTION_ENUM.BOTTOM;
      } else if (this.direction === DIRECTION_ENUM.BOTTOM) {
        this.direction = DIRECTION_ENUM.RIGHT;
      } else if (this.direction === DIRECTION_ENUM.RIGHT) {
        this.direction = DIRECTION_ENUM.TOP;
      }
    }
  }
}