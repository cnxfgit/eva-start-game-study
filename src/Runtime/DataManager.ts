import {ITile} from '../Levels';
import Singleton from '../Base/Singleton';
import TileManager from "../Scenes/Battle/GameObjects/Tile/TileManager";
import PlayerManager from "../Scenes/Battle/GameObjects/Player/Scripts/PlayerManager";

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

  reset(){
    this.player = null;
    this.mapInfo = [];
    this.tileInfo = [];
    this.mapRowCount = 0;
    this.mapColumnCount = 0;
  }
}