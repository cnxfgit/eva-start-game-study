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
  PLAYER_MOVE_END = 'PLAYER_MOVE_END',
  ATTACK_PLAYER = 'ATTACK_PLAYER',
  ATTACK_ENEMY = 'ATTACK_ENEMY',
  PLAYER_CTRL = 'PLAYER_CTRL',
  DOOR_OPEN = 'DOOR_OPEN',
  SHOW_SMOKE = 'SHOW_SMOKE',
  SCREEN_SHAKE = 'SCREEN_SHAKE',
}

export enum CONTROLLER_ENUM {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  TURNLEFT = 'TURNLEFT',
  TURNRIGHT = 'TURNRIGHT'
}

export enum FMS_PARAMS_TYPE_ENUM {
  NUMBER = 'NUMBER',
  TRIGGER = 'TRIGGER'
}

export enum PARAMS_NAME_ENUM {
  IDLE = 'IDLE',
  ATTACK = 'ATTACK',
  TURNLEFT = 'TURNLEFT',
  TURNRIGHT = 'TURNRIGHT',
  BLOCKFRONT = 'BLOCKFRONT',
  BLOCKBCAK = 'BLOCKBCAK',
  BLOCKLEFT = 'BLOCKLEFT',
  BLOCKRIGHT = 'BLOCKRIGHT',
  BLOCKTURNLEFT = 'BLOCKTURNLEFT',
  BLOCKTURNRIGHT = 'BLOCKTURNRIGHT',
  DIRECTION = 'DIRECTION',
  DEATH = 'DEATH',
  AIRDEATH = 'AIRDEATH',
  SPIKES_CUR_COUNT = 'SPIKES_CUR_COUNT',
  SPIKES_TOTAL_COUNT = 'SPIKES_TOTAL_COUNT',
}

export enum DIRECTION_ENUM {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum ENTITY_STATE_ENUM {
  IDLE = 'IDLE',
  ATTACK = 'ATTACK',
  TURNLEFT = 'TURNLEFT',
  TURNRIGHT = 'TURNRIGHT',
  BLOCKFRONT = 'BLOCKFRONT',
  BLOCKBACK = 'BLOCKBACK',
  BLOCKLEFT = 'BLOCKLEFT',
  BLOCKRIGHT = 'BLOCKRIGHT',
  BLOCKTURNLEFT = 'BLOCKTURNLEFT',
  BLOCKTURNRIGHT = 'BLOCKTURNRIGHT',
  DEATH = 'DEATH',
  AIRDEATH = 'AIRDEATH',
}

export enum DIRECTION_ORDER_ENUM {
  TOP = 0,
  BOTTOM = 1,
  LEFT = 2,
  RIGHT = 3,
}

export enum ENTITY_TYPE_ENUM {
  PLAYER = 'PLAYER',
  SKELETON_WOODEN = 'SKELETON_WOODEN',
  SKELETON_IRON = 'SKELETON_IRON',
  SPIKES_ONE = 'SPIKES_ONE',
  SPIKES_TWO = 'SPIKES_TWO',
  SPIKES_THREE = 'SPIKES_THREE',
  SPIKES_FOUR = 'SPIKES_FOUR',
  BURST = 'BURST',
  DOOR = 'DOOR',
  SMOKE = 'SMOKE',
}

export enum SPIKES_TYPE_MAP_TOTAL_COUNT {
  SPIKES_ONE = 2,
  SPIKES_TWO = 3,
  SPIKES_THREE = 4,
  SPIKES_FOUR = 5,
}

export enum SPIKES_COUNT_ENUM {
  ZERO = 'ZERO',
  ONE = 'ONE',
  TWO = 'TWO',
  THREE = 'THREE',
  FOUR = 'FOUR',
  FIVE = 'FIVE',
}

export enum SPIKES_COUNT_MAP_NUMBER_ENUM {
  ZERO = 0,
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4,
  FIVE = 5,
}