export enum TILE_TYPE_ENUM {
  WALL_ROW = 'WALL_ROW', // 横墙
  WALL_COLUMN = 'WALL_COLUMN', // 竖墙
  WALL_LEFT_TOP = 'WALL_LEFT_TOP', // 左上角
  WALL_LEFT_BOTTOM = 'WALL_LEFT_BOTTOM', // 左下角
  WALL_RIGHT_TOP = 'WALL_RIGHT_TOP', // 右上角
  WALL_RIGHT_BOTTOM = 'WALL_RIGHT_BOTTOM', // 右下角
  CLIFF_CENTER = 'CLIFF_CENTER', // 悬崖中
  CLIFF_LEFT = 'CLIFF_LEFT', // 悬崖左
  CLIFF_RIGHT = 'CLIFF_RIGHT', // 悬崖右
  FLOOR = 'FLOOR' // 地板
}

export enum EVENT_ENUM {
  NEXT_LEVEL = 'NEXT_LEVEL',
  PLAYER_CTRL = 'PLAYER_CTRL'
}

export enum CONTROLLER_ENUM {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  TURNLEFT = 'TURNLEFT',
  TURNRIGHT = 'TURNRIGHT'
}