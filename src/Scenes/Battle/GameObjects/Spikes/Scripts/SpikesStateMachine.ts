import {ENTITY_TYPE_ENUM, PARAMS_NAME_ENUM, SPIKES_TYPE_MAP_TOTAL_COUNT} from '../../../../../Enums';
import {ANIMATION_SPEED} from '../../../../../Base/State';
import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';
import StateMachine, {getInitParamsNumber} from '../../../../../Base/StateMachine';
import SpikesOneSubStateMachine from './SpikesOneSubStateMachine';
import SpikesTwoSubStateMachine from "./SpikesTwoSubStateMachine";
import SpikesThreeSubStateMachine from "./SpikesThreeSubStateMachine";
import SpikesFourSubStateMachine from "./SpikesFourSubStateMachine";


export default class SpikesStateMachine extends StateMachine {
  static componentName = 'SpikesStateMachine';

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
    this.params.set(PARAMS_NAME_ENUM.SPIKES_CUR_COUNT, getInitParamsNumber());
    this.params.set(PARAMS_NAME_ENUM.SPIKES_TOTAL_COUNT, getInitParamsNumber());
  }

  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(ENTITY_TYPE_ENUM.SPIKES_ONE,
      new SpikesOneSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(ENTITY_TYPE_ENUM.SPIKES_TWO,
      new SpikesTwoSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(ENTITY_TYPE_ENUM.SPIKES_THREE,
      new SpikesThreeSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(ENTITY_TYPE_ENUM.SPIKES_FOUR,
      new SpikesFourSubStateMachine(this, spriteAnimation));
  }

  initAnimationEvent() {
  }

  run() {
    const {value} = this.params.get(PARAMS_NAME_ENUM.SPIKES_TOTAL_COUNT);
    switch (this.currentState) {
      case this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_ONE):
      case this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_TWO):
      case this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_THREE):
      case this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_FOUR):
        if (value === SPIKES_TYPE_MAP_TOTAL_COUNT.SPIKES_ONE) {
          this.currentState = this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_ONE);
        } else if (value === SPIKES_TYPE_MAP_TOTAL_COUNT.SPIKES_TWO) {
          this.currentState = this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_TWO);
        }else if (value === SPIKES_TYPE_MAP_TOTAL_COUNT.SPIKES_THREE) {
          this.currentState = this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_THREE);
        }else if (value === SPIKES_TYPE_MAP_TOTAL_COUNT.SPIKES_FOUR) {
          this.currentState = this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_FOUR);
        } else {
          this.currentState = this.currentState;
        }
        break;
      default:
        this.currentState = this.stateMachines.get(ENTITY_TYPE_ENUM.SPIKES_ONE);
        break;
    }
  }
}