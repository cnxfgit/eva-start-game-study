import SubStateMachine from '../../../../../Base/SubStateMachine';
import PlayerStateMachine from './PlayerStateMachine';
import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';
import {DIRECTION_ENUM, DIRECTION_ORDER_ENUM, PARAMS_NAME_ENUM} from '../../../../../Enums';
import State from '../../../../../Base/State';

export default class TurnLeftSubStateMachine extends SubStateMachine{
  constructor(public fsm: PlayerStateMachine,
              public spriteAnimation: SpriteAnimation) {
    super(fsm);

    this.stateMachines.set(DIRECTION_ENUM.TOP,
      new State(spriteAnimation, 'player_turn_left_top',1));
    this.stateMachines.set(DIRECTION_ENUM.BOTTOM,
      new State(spriteAnimation, 'player_turn_left_bottom',1));
    this.stateMachines.set(DIRECTION_ENUM.LEFT,
      new State(spriteAnimation, 'player_turn_left_left',1));
    this.stateMachines.set(DIRECTION_ENUM.RIGHT,
      new State(spriteAnimation, 'player_turn_left_right',1));
  }

  run(): void {
    const {value: newDirection} = this.fsm.params.get(PARAMS_NAME_ENUM.DIRECTION);
    this.currentState = this.stateMachines.get(DIRECTION_ORDER_ENUM[newDirection as number]);
  }
}