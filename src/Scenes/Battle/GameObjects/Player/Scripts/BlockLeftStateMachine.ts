

import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';
import {DIRECTION_ENUM} from '../../../../../Enums';
import State from '../../../../../Base/State';
import DirectionSubStateMachine from '../../../../../Base/DirectionSubStateMachine';
import StateMachine from '../../../../../Base/StateMachine';

export default class BlockLeftStateMachine extends DirectionSubStateMachine {

  constructor(public fsm: StateMachine,
              public spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(DIRECTION_ENUM.TOP,
      new State(spriteAnimation, 'player_block_left_top',1));
    this.stateMachines.set(DIRECTION_ENUM.BOTTOM,
      new State(spriteAnimation, 'player_block_left_bottom',1));
    this.stateMachines.set(DIRECTION_ENUM.LEFT,
      new State(spriteAnimation, 'player_block_left_left',1));
    this.stateMachines.set(DIRECTION_ENUM.RIGHT,
      new State(spriteAnimation, 'player_block_left_right',1));
  }
}