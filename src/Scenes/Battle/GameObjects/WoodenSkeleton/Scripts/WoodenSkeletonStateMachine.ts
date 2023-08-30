import {PARAMS_NAME_ENUM} from '../../../../../Enums';
import {ANIMATION_SPEED} from '../../../../../Base/State';
import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';
import StateMachine, {getInitParamsNumber, getInitParamsTrigger} from '../../../../../Base/StateMachine';
import IdleSubStateMachine from './IdleSubStateMachine';


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
    this.params.set(PARAMS_NAME_ENUM.DIRECTION, getInitParamsNumber());
  }

  initStateMachines() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    this.stateMachines.set(PARAMS_NAME_ENUM.IDLE,
      new IdleSubStateMachine(this, spriteAnimation));
  }

  initAnimationEvent() {
    const spriteAnimation = this.gameObject.getComponent(SpriteAnimation);
    spriteAnimation.on('complete', () => {
      // const list = ['player_turn'];
      // if (list.some(i => spriteAnimation.resource.startsWith(i))) {
      //   this.currentState = this.stateMachines.get(PARAMS_NAME_ENUM.IDLE);
      // }
    });
  }

  run() {
    switch (this.currentState) {
      case this.stateMachines.get(PARAMS_NAME_ENUM.IDLE):
        if (this.params.get(PARAMS_NAME_ENUM.IDLE).value) {
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