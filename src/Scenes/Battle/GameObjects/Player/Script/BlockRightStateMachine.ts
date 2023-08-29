
import PlayerStateMachine from './PlayerStateMachine';
import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';
import {DIRECTION_ENUM} from '../../../../../Enums';
import State from '../../../../../Base/State';
import DirectionSubStateMachine from '../../../../../Base/DirectionSubStateMachine';

export default class BlockRightStateMachine extends DirectionSubStateMachine {

  constructor(public fsm: PlayerStateMachine,
              public spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(DIRECTION_ENUM.TOP,
      new State(spriteAnimation, 'player_block_right_top',1));
    this.stateMachines.set(DIRECTION_ENUM.BOTTOM,
      new State(spriteAnimation, 'player_block_right_bottom',1));
    this.stateMachines.set(DIRECTION_ENUM.LEFT,
      new State(spriteAnimation, 'player_block_right_left',1));
    this.stateMachines.set(DIRECTION_ENUM.RIGHT,
      new State(spriteAnimation, 'player_block_right_right',1));
  }
}