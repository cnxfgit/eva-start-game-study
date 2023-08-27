import {Component} from '@eva/eva.js';
import {FMS_PARAMS_TYPE_ENUM, PARAMS_NAME_ENUM} from '../../../../../Enums';
import State, {ANIMATION_SPEED} from '../../../../../Base/State';
import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';
import IdleSubStateMachine from './IdleSubStateMachine';
import TurnLeftSubStateMachine from './TurnLeftSubStateMachine';
import SubStateMachine from '../../../../../Base/SubStateMachine';


type ParamsValueType = number | boolean;

export interface IParams {
  type: FMS_PARAMS_TYPE_ENUM;
  value: ParamsValueType,
}

export const getInitParamsTrigger = () => {
  return {
    type: FMS_PARAMS_TYPE_ENUM.TRIGGER,
    value: false
  }
};

export const getInitParamsNumber = () => {
  return {
    type: FMS_PARAMS_TYPE_ENUM.NUMBER,
    value: 0
  }
};

export default class PlayerStateMachine extends Component {
  static componentName = 'PlayerStateMachine';
  private _currentState: State | SubStateMachine = null;
  params: Map<string, IParams> = new Map();
  stateMachines: Map<string, State | SubStateMachine> = new Map();

  getParams(paramName: string) {
    if (this.params.has(paramName)) {
      return this.params.get(paramName).value;
    }
  }

  setParams(paramName: string, vaule: ParamsValueType) {
    if (this.params.has(paramName)) {
      this.params.get(paramName).value = vaule;
      this.run();
      this.resetTrigger();
    }
  }

  resetTrigger() {
    for (const [, value] of this.params) {
      if (value.type === FMS_PARAMS_TYPE_ENUM.TRIGGER) {
        value.value = false;
      }
    }
  }

  get currentState() {
    return this._currentState;
  }

  set currentState(newState) {
    this._currentState = newState;
    this._currentState.run();
  }

  init() {
    this.gameObject.addComponent(new SpriteAnimation({
      resource: '',
      speed: ANIMATION_SPEED,
      forwards: true,
      autoPlay: false,
    }));

    this.initParams();
    this.initStateMachines();
    this.initAnimationEvent();
  }

  initParams() {
    this.params.set(PARAMS_NAME_ENUM.IDLE, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.TURNLEFT, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.DIRECTION, getInitParamsNumber());
  }

  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(PARAMS_NAME_ENUM.IDLE, new IdleSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.TURNLEFT, new TurnLeftSubStateMachine(this, spriteAnimation));
  }

  initAnimationEvent() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      const list = ['player_turn'];
      if (list.some(i => spriteAnimation.resource.startsWith(i))) {
        this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
      }
    });
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME_ENUM.IDLE):
      case this.stateMachines.get(PARAMS_NAME_ENUM.TURNLEFT):
        if (this.params.get(PARAMS_NAME_ENUM.TURNLEFT).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.TURNLEFT);
        } else if (this.params.get(PARAMS_NAME_ENUM.IDLE).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
        } else {
          this.currentState = this.currentState;
        }
        break;
      default:
        this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
        break;
    }
  }
}