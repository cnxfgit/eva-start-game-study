import {Component} from '@eva/eva.js';
import {randomByLen} from '../../../../../Utils/inedx';
import {ENTITY_TYPE_ENUM, PARAMS_NAME_ENUM, SPIKES_TYPE_MAP_TOTAL_COUNT} from '../../../../../Enums';
import {TILE_HEIGHT, TILE_WIDTH} from '../../Tile';
import SpikesStateMachine from './SpikesStateMachine';

export default class SpikesManager extends Component {
  static componentName = 'SpikesManager';

  id: string = randomByLen(12);
  x: number = 2;
  y: number = 7;
  private _count: number;
  private _totalCount: number;
  fsm: SpikesStateMachine;
  type: ENTITY_TYPE_ENUM;

  get count() {
    return this._count;
  }

  set count(newCount) {
    this._count = newCount;
    this.fsm.setParams(PARAMS_NAME_ENUM.SPIKES_CUR_COUNT, newCount);
  }

  get totalCount() {
    return this._totalCount;
  }

  set totalCount(newCount) {
    this._totalCount = newCount;
    this.fsm.setParams(PARAMS_NAME_ENUM.SPIKES_TOTAL_COUNT, newCount);
  }

  init() {
    this.fsm = this.gameObject.addComponent(new SpikesStateMachine());
    this.x = 3;
    this.y = 7;
    this.type = ENTITY_TYPE_ENUM.SPIKES_FOUR;
    this.totalCount = SPIKES_TYPE_MAP_TOTAL_COUNT[this.type];
    this.count = 0;
  }


  update() {
    this.gameObject.transform.position.x = this.x * TILE_WIDTH - 1.5 * TILE_WIDTH;
    this.gameObject.transform.position.y = this.y * TILE_HEIGHT - 1.5 * TILE_HEIGHT;
  }
}