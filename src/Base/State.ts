import {SpriteAnimation} from '@eva/plugin-renderer-sprite-animation';


export const ANIMATION_SPEED = 1000 / 8;

export default class State {
  constructor(public spriteAnimation: SpriteAnimation,
              public animationName: string,
              public times?: number) {
  }

  run(){
    if (this.animationName === this.spriteAnimation.resource) {
      return;
    }
    // @ts-ignore
    this.spriteAnimation.complete = false;
    this.spriteAnimation.resource = this.animationName;
    requestAnimationFrame(()=>{
      this.spriteAnimation.play(this.times);
    });
  }
}