import {ITile} from '../Levels';
import Singleton from '../Base/Singleton';
import TileManager from '../Scenes/Battle/GameObjects/Tile/TileManager';
import PlayerManager from '../Scenes/Battle/GameObjects/Player/Scripts/PlayerManager';
import DoorManager from '../Scenes/Battle/GameObjects/Door/Scripts/DoorManager';
import EnemyManager from '../Base/EnemyManager';
import BurstManager from '../Scenes/Battle/GameObjects/Burst/Scripts/BurstManager';
import SpikesManager from '../Scenes/Battle/GameObjects/Spikes/Scripts/SpikesManager';
import SmokeManager from '../Scenes/Battle/GameObjects/Smoke/Scripts/SmokeManager';

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
  bursts: Array<BurstManager>
  spikes: Array<SpikesManager>
  smokes: Array<SmokeManager>

  reset(){
    this.player = null;
    this.door = null;
    this.enemies = [];
    this.bursts = [];
    this.spikes = [];
    this.mapInfo = [];
    this.tileInfo = [];
    this.smokes = [];
    this.mapRowCount = 0;
    this.mapColumnCount = 0;
  }
}