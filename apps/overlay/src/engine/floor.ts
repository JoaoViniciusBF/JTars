// floor.ts
import * as PIXI from "pixi.js";

export class Floor {
  public graphics: PIXI.Graphics;

  public height = 30;
  public y = 0;

  constructor(width: number, screenHeight: number) {
    this.graphics = new PIXI.Graphics();

    this.resize(width, screenHeight);
  }

  resize(width: number, screenHeight: number) {
    this.y = screenHeight - this.height;

    this.graphics.clear();

    this.graphics.beginFill(0x38f132);
    this.graphics.drawRect(0, this.y, width, this.height);
    this.graphics.endFill();
  }
}