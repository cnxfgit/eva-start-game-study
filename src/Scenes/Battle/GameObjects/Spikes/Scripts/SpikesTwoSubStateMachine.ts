import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';
import {
  SPIKES_COUNT_ENUM,
} from '../../../../../Enums';
import State from '../../../../../Base/State';
import StateMachine from '../../../../../Base/StateMachine';
import SpikesSubStateMachine from './SpikesSubStateMachine';

export default class SpikesTwoSubStateMachine extends SpikesSubStateMachine {

  constructor(public fsm: StateMachine,
              public spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(SPIKES_COUNT_ENUM.ZERO,
      new State(spriteAnimation, 'spikes_two_zero', 1));
    this.stateMachines.set(SPIKES_COUNT_ENUM.ONE,
      new State(spriteAnimation, 'spikes_two_one', 1));
    this.stateMachines.set(SPIKES_COUNT_ENUM.TWO,
      new State(spriteAnimation, 'spikes_two_two', 1));
    this.stateMachines.set(SPIKES_COUNT_ENUM.THREE,
      new State(spriteAnimation, 'spikes_two_three', 1));
  }
}