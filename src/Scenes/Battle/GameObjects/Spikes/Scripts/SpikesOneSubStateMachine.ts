import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';
import {
  PARAMS_NAME_ENUM,
  SPIKES_COUNT_ENUM,
  SPIKES_COUNT_MAP_NUMBER_ENUM
} from '../../../../../Enums';
import State from '../../../../../Base/State';
import StateMachine from '../../../../../Base/StateMachine';
import SubStateMachine from '../../../../../Base/SubStateMachine';

export default class SpikesOneSubStateMachine extends SubStateMachine {

  constructor(public fsm: StateMachine,
              public spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(SPIKES_COUNT_ENUM.ZERO,
      new State(spriteAnimation, 'spikes_one_zero', 1));
    this.stateMachines.set(SPIKES_COUNT_ENUM.ONE,
      new State(spriteAnimation, 'spikes_one_two', 1));
    this.stateMachines.set(SPIKES_COUNT_ENUM.TWO,
      new State(spriteAnimation, 'spikes_one_three', 1));
  }

  run() {
    const {value: newCount} = this.fsm.params.get(PARAMS_NAME_ENUM.SPIKES_CUR_COUNT);
    this.currentState = this.stateMachines.get(SPIKES_COUNT_MAP_NUMBER_ENUM[newCount as number])
  }
}