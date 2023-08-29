import EventManager from '../../../../../Runtime/EventManager';
import {CONTROLLER_ENUM, DIRECTION_ENUM, ENTITY_STATE_ENUM, EVENT_ENUM,} from '../../../../../Enums';
import PlayerStateMachine from './PlayerStateMachine';
import EntityManager from '../../../../../Base/EntityManager';
import DataManager from '../../../../../Runtime/DataManager';

export class PlayerManager extends EntityManager {
  static componentName = 'PlayerManager';


  targetX: number;
  targetY: number;
  readonly speed = 1 / 10;

  init() {
    this.fsm = this.gameObject.addComponent(new PlayerStateMachine());
    this.x = 2;
    this.y = 8;
    this.targetX = 2;
    this.targetY = 8;
    EventManager.Instance.on(EVENT_ENUM.PLAYER_CTRL, this.inputHandler, this);
    this.state = ENTITY_STATE_ENUM.IDLE;
    this.direction = DIRECTION_ENUM.TOP;
  }

  update() {
    this.updateXY();
    super.update();
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

  inputHandler(inputDirection: CONTROLLER_ENUM) {
    if (this.willBlock(inputDirection)) {
      return
    }

    this.move(inputDirection);
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
      if (this.direction === DIRECTION_ENUM.TOP) {
        this.direction = DIRECTION_ENUM.LEFT;
      } else if (this.direction === DIRECTION_ENUM.LEFT) {
        this.direction = DIRECTION_ENUM.BOTTOM;
      } else if (this.direction === DIRECTION_ENUM.BOTTOM) {
        this.direction = DIRECTION_ENUM.RIGHT;
      } else if (this.direction === DIRECTION_ENUM.RIGHT) {
        this.direction = DIRECTION_ENUM.TOP;
      }
      this.state = ENTITY_STATE_ENUM.TURNLEFT;
    } else if (inputDirection === CONTROLLER_ENUM.TURNRIGHT) {
      if (this.direction === DIRECTION_ENUM.TOP) {
        this.direction = DIRECTION_ENUM.RIGHT;
      } else if (this.direction === DIRECTION_ENUM.RIGHT) {
        this.direction = DIRECTION_ENUM.BOTTOM;
      } else if (this.direction === DIRECTION_ENUM.BOTTOM) {
        this.direction = DIRECTION_ENUM.LEFT;
      } else if (this.direction === DIRECTION_ENUM.LEFT) {
        this.direction = DIRECTION_ENUM.TOP;
      }
      this.state = ENTITY_STATE_ENUM.TURNRIGHT;
    }
  }

  willBlock(inputDirection: CONTROLLER_ENUM) {
    const {tileInfo, mapRowCount: row, mapColumnCount: column} = DataManager.Instance;
    const {targetX: x, targetY: y, direction} = this;
    if (inputDirection === CONTROLLER_ENUM.TOP) {
      if (direction === DIRECTION_ENUM.TOP) {
        const playerNextY = y - 1;
        if (playerNextY < 0) {
          return true;
        }

        const weaponNextY = y - 2;
        const playerNextTile = tileInfo[x][playerNextY];
        const weaponNextTile = tileInfo[x][weaponNextY];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        const playerNextY = y - 1;
        if (playerNextY < 0) {
          return true;
        }

        const weaponNextY = y;
        const playerNextTile = tileInfo[x][playerNextY];
        const weaponNextTile = tileInfo[x][weaponNextY];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.LEFT) {
        const playerNextY = y - 1;
        if (playerNextY < 0) {
          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y - 1;
        const playerNextTile = tileInfo[x][playerNextY];
        const weaponNextTile = tileInfo[weaponNextX][weaponNextY];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        const playerNextY = y - 1;
        if (playerNextY < 0) {
          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y - 1;
        const playerNextTile = tileInfo[x][playerNextY];
        const weaponNextTile = tileInfo[weaponNextX][weaponNextY];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      }
    } else if (inputDirection === CONTROLLER_ENUM.BOTTOM) {
      if (direction === DIRECTION_ENUM.TOP) {
        const playerNextY = y + 1;
        if (playerNextY > column - 1) {
          return true;
        }

        const weaponNextY = y;
        const playerNextTile = tileInfo[x][playerNextY];
        const weaponNextTile = tileInfo[x][weaponNextY];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        const playerNextY = y + 1;
        if (playerNextY > column - 1) {
          return true;
        }

        const weaponNextY = y + 2;
        const playerNextTile = tileInfo[x][playerNextY];
        const weaponNextTile = tileInfo[x][weaponNextY];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.LEFT) {
        const playerNextY = y + 1;
        if (playerNextY > column - 1) {
          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y + 1;
        const playerNextTile = tileInfo[x][playerNextY];
        const weaponNextTile = tileInfo[weaponNextX][weaponNextY];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        const playerNextY = y + 1;
        if (playerNextY > column - 1) {
          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y + 1;
        const playerNextTile = tileInfo[x][playerNextY];
        const weaponNextTile = tileInfo[weaponNextX][weaponNextY];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      }
    } else if (inputDirection === CONTROLLER_ENUM.LEFT) {
      if (direction === DIRECTION_ENUM.TOP) {
        const playerNextX = x - 1;
        if (playerNextX < 0) {
          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y - 1;
        const playerNextTile = tileInfo[playerNextX][y];
        const weaponNextTile = tileInfo[weaponNextX][weaponNextY];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        const playerNextX = x - 1;
        if (playerNextX < 0) {
          return true;
        }

        const weaponNextX = x - 1;
        const weaponNextY = y + 1;
        const playerNextTile = tileInfo[playerNextX][y];
        const weaponNextTile = tileInfo[weaponNextX][weaponNextY];
        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.LEFT) {
        const playerNextX = x - 1;
        if (playerNextX < 0) {
          return true;
        }

        const weaponNextX = x - 2;
        const playerNextTile = tileInfo[playerNextX][y];
        const weaponNextTile = tileInfo[weaponNextX][y];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        const playerNextX = x - 1;
        if (playerNextX > row - 1) {
          return true;
        }

        const weaponNextX = x;
        const playerNextTile = tileInfo[playerNextX][y];
        const weaponNextTile = tileInfo[weaponNextX][y];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      }
    } else if (inputDirection === CONTROLLER_ENUM.RIGHT) {
      if (direction === DIRECTION_ENUM.TOP) {
        const playerNextX = x + 1;
        if (playerNextX > row - 1) {
          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y - 1;
        const playerNextTile = tileInfo[playerNextX][y];
        const weaponNextTile = tileInfo[weaponNextX][weaponNextY];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        const playerNextX = x + 1;
        if (playerNextX > row - 1) {
          return true;
        }

        const weaponNextX = x + 1;
        const weaponNextY = y - 1;
        const playerNextTile = tileInfo[playerNextX][y];
        const weaponNextTile = tileInfo[weaponNextX][weaponNextY];
        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.LEFT) {
        const playerNextX = x + 1;
        if (playerNextX > row - 1) {
          return true;
        }

        const weaponNextX = x;
        const playerNextTile = tileInfo[playerNextX][y];
        const weaponNextTile = tileInfo[weaponNextX][y];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        const playerNextX = x + 1;
        if (playerNextX > row - 1) {
          return true;
        }

        const weaponNextX = x + 2;
        const playerNextTile = tileInfo[playerNextX][y];
        const weaponNextTile = tileInfo[weaponNextX][y];

        if (playerNextTile && playerNextTile.moveable && (!weaponNextTile || weaponNextTile.turnable)) {
          // nothing
        } else {
          return true;
        }
      }
    } else if (inputDirection === CONTROLLER_ENUM.TURNLEFT) {
      let nextX, nextY;
      if (direction === DIRECTION_ENUM.TOP) {
        nextX = x - 1;
        nextY = y - 1;
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        nextX = x + 1;
        nextY = y + 1;
      } else if (direction === DIRECTION_ENUM.LEFT) {
        nextX = x - 1;
        nextY = y + 1;
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        nextX = x + 1;
        nextY = y - 1;
      }

      if ((!tileInfo[x]?.[nextY] || tileInfo[x]?.[nextY]?.turnable) &&
        (!tileInfo[nextX]?.[y] || tileInfo[nextX]?.[y]?.turnable) &&
        (!tileInfo[nextX]?.[nextY] || tileInfo[nextX]?.[nextY]?.turnable)) {
        // nothing
      } else {
        return true;
      }
    } else if (inputDirection === CONTROLLER_ENUM.TURNRIGHT) {
      let nextX, nextY;
      if (direction === DIRECTION_ENUM.TOP) {
        nextX = x + 1;
        nextY = y - 1;
      } else if (direction === DIRECTION_ENUM.BOTTOM) {
        nextX = x - 1;
        nextY = y + 1;
      } else if (direction === DIRECTION_ENUM.LEFT) {
        nextX = x - 1;
        nextY = y - 1;
      } else if (direction === DIRECTION_ENUM.RIGHT) {
        nextX = x + 1;
        nextY = y + 1;
      }

      if ((!tileInfo[x]?.[nextY] || tileInfo[x]?.[nextY]?.turnable) &&
        (!tileInfo[nextX]?.[y] || tileInfo[nextX]?.[y]?.turnable) &&
        (!tileInfo[nextX]?.[nextY] || tileInfo[nextX]?.[nextY]?.turnable)) {
        // nothing
      } else {
        return true;
      }
    }
    return false;
  }
}