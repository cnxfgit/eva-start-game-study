import State from './State';
import SubStateMachine from './SubStateMachine';
import {FMS_PARAMS_TYPE_ENUM} from '../Enums';
import {Component} from "@eva/eva.js";

export type ParamsValueType = number | boolean;

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


export default abstract class StateMachine extends Component{
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

  abstract run(): void;
}