import {ENTITY_STATE_ENUM, PARAMS_NAME_ENUM} from '../../../../../Enums';
import {ANIMATION_SPEED} from '../../../../../Base/State';
import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';
import StateMachine, {getInitParamsNumber, getInitParamsTrigger} from '../../../../../Base/StateMachine';
import IdleSubStateMachine from './IdleSubStateMachine';
import AttackSubStateMachine from './AttackSubStateMachine';
import WoodenSkeletonManager from './WoodenSkeletonManager';
import DeathSubStateMachine from "./DeathSubStateMachine";


export default class WoodenSkeletonStateMachine extends StateMachine {
  static componentName = 'WoodenSkeletonStateMachine';

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
    this.params.set(PARAMS_NAME_ENUM.ATTACK, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.DEATH, getInitParamsTrigger());
    this.params.set(PARAMS_NAME_ENUM.DIRECTION, getInitParamsNumber());
  }

  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(PARAMS_NAME_ENUM.IDLE,
      new IdleSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.ATTACK,
      new AttackSubStateMachine(this, spriteAnimation));
    this.stateMachines.set(PARAMS_NAME_ENUM.DEATH,
      new DeathSubStateMachine(this, spriteAnimation));
  }

  initAnimationEvent() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      const list = ['woodenskeleton_attack'];
      if (list.some(i => spriteAnimation.resource.startsWith(i))) {
        this.gameObject.getComponent(WoodenSkeletonManager).state = ENTITY_STATE_ENUM.IDLE;
      }
    });
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME_ENUM.IDLE):
        if (this.params.get(PARAMS_NAME_ENUM.ATTACK).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.ATTACK);
        } else if (this.params.get(PARAMS_NAME_ENUM.DEATH).value) {
          this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.DEATH);
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