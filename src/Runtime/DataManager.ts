import {ITile} from '../Levels';
import Singleton from '../Base/Singleton';

export default class DataManager extends Singleton {
  static get Instance() {
    return super.GetInstance<DataManager>();
  }

  levelIndex: number = 1;
  mapInfo: Array<Array<ITile>>;
  mapRowCount: number;
  mapColumnCount: number;
}