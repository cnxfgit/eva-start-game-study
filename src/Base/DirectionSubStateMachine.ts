
import { DIRECTION_ORDER_ENUM, PARAMS_NAME_ENUM} from '../Enums';
import SubStateMachine from './SubStateMachine';

export default class DirectionSubStateMachine extends SubStateMachine{
  run(): void {
    const {value: newDirection} = this.fsm.params.get(PARAMS_NAME_ENUM.DIRECTION);
    this.currentState = this.stateMachines.get(DIRECTION_ORDER_ENUM[newDirection as number]);
  }
}