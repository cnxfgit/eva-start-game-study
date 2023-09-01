import {ITile} from '../Levels';
import Singleton from '../Base/Singleton';
import TileManager from '../Scenes/Battle/GameObjects/Tile/TileManager';
import PlayerManager from '../Scenes/Battle/GameObjects/Player/Scripts/PlayerManager';
import DoorManager from '../Scenes/Battle/GameObjects/Door/Scripts/DoorManager';
import EnemyManager from '../Base/EnemyManager';

export default class DataManager extends Singleton {
  static get Instance() {
    return super.GetInstance<DataManager>();
  }

  levelIndex: number = 1;
  mapInfo: Array<Array<ITile>>;
  tileInfo: Array<Array<TileManager>>;
  mapRowCount: number;
  mapColumnCount: number;
  player: PlayerManager;
  door: DoorManager;
  enemies: Array<EnemyManager>

  reset(){
    this.player = null;
    this.door = null;
    this.enemies = [];
    this.mapInfo = [];
    this.tileInfo = [];
    this.mapRowCount = 0;
    this.mapColumnCount = 0;
  }
}