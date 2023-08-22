import {Component} from '@eva/eva.js';
import TileMap from './GameObjects/TileMap';

export class BattleManager extends Component {
  static componentName = 'BattleManager'; // 设置组件的名字

  init (){
    this.initLevel();
  }

  initLevel(){
    this.generateTileMap()
  }

  generateTileMap(){
    this.gameObject.addChild(TileMap());
    this.adaptPos();
  }

  adaptPos(){

  }
}