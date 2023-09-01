import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';
import {DIRECTION_ENUM} from '../../../../../Enums';
import State from '../../../../../Base/State';
import DirectionSubStateMachine from '../../../../../Base/DirectionSubStateMachine';
import StateMachine from '../../../../../Base/StateMachine';

export default class IdleSubStateMachine extends DirectionSubStateMachine {

  constructor(public fsm: StateMachine,
              public spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(DIRECTION_ENUM.TOP,
      new State(spriteAnimation, 'ironskeleton_idle_top'));
    this.stateMachines.set(DIRECTION_ENUM.BOTTOM,
      new State(spriteAnimation, 'ironskeleton_idle_bottom'));
    this.stateMachines.set(DIRECTION_ENUM.LEFT,
      new State(spriteAnimation, 'ironskeleton_idle_left'));
    this.stateMachines.set(DIRECTION_ENUM.RIGHT,
      new State(spriteAnimation, 'ironskeleton_idle_right'));
  }
}