import State from './State';
import PlayerStateMachine from '../Scenes/Battle/GameObjects/Player/Script/PlayerStateMachine';

export default abstract class SubStateMachine {
  private _currentState: State = null;
  stateMachines: Map<string, State> = new Map();

  constructor(public fsm: PlayerStateMachine) {
  }

  get currentState() {
    return this._currentState;
  }

  set currentState(newState) {
    this._currentState = newState;
    this._currentState.run();
  }

  abstract run(): void;
}