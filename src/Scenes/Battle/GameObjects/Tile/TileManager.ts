import {Component} from "@eva/eva.js";
import {TILE_TYPE_ENUM} from "../../../../Enums";

export default class TileManager extends Component {
  static componentName = 'TileManager'

  type: TILE_TYPE_ENUM
  moveable: boolean
  turnable: boolean

  init(type: TILE_TYPE_ENUM) {
    this.type = type;
    if (this.type === TILE_TYPE_ENUM.WALL_ROW ||
      this.type === TILE_TYPE_ENUM.WALL_COLUMN ||
      this.type === TILE_TYPE_ENUM.WALL_LEFT_TOP ||
      this.type === TILE_TYPE_ENUM.WALL_LEFT_BOTTOM ||
      this.type === TILE_TYPE_ENUM.WALL_RIGHT_TOP ||
      this.type === TILE_TYPE_ENUM.WALL_RIGHT_BOTTOM) {
      this.moveable = false;
      this.turnable = false;
    } else if (this.type === TILE_TYPE_ENUM.CLIFF_CENTER ||
      this.type === TILE_TYPE_ENUM.CLIFF_LEFT ||
      this.type === TILE_TYPE_ENUM.CLIFF_RIGHT) {
      this.moveable = false;
      this.turnable = true;
    } else if (this.type === TILE_TYPE_ENUM.FLOOR) {
      this.moveable = true;
      this.turnable = true;
    }
  }

}