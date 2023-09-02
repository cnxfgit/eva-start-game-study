import EntityManager from '../../../../../Base/EntityManager';
import {IEntity} from '../../../../../Levels';
import SmokeStateMachine from './SmokeStateMachine';


export default class SmokeManager extends EntityManager {
  static componentName = 'SmokeManager';

  init(params: IEntity) {
    this.fsm = this.gameObject.addComponent(new SmokeStateMachine());
    super.init(params);
  }

}