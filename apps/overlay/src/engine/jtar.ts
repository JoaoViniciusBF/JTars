import * as PIXI from "pixi.js";
import { GRAVITY, MOVE_SPEED } from "./physics";
import { WanderAI } from "./movement";

export type JtarProps = {
  name?: string;
  color?: PIXI.Color;
  direction?: number;
  scale?: number;
  skin?: string;
  isAnonymous?: boolean;
  key?: number;
};

export type JtarSpawnProps = {
  isFalling?: boolean;
  positionX?: number;
  onComplete?: () => void;
};

export class JTar {
  public container: PIXI.Container;
  public graphics: PIXI.Graphics;
  public nickname: PIXI.Text;

  private velocityX = 0;
  private velocityY = 0;
  private grounded = false;

  private ai = new WanderAI();

  constructor(private user: any) {
    this.container = new PIXI.Container();

    // body
    this.graphics = new PIXI.Graphics();

    // nickname
    this.nickname = new PIXI.Text(user.displayName, {
      fontSize: 6,
      fill: 0xffffff,
      stroke: 0x000000,
      strokeThickness: 3,
    });

    this.nickname.anchor.set(0.5, 1);
    this.nickname.position.set(20, -5); // centered above avatar

    // draw avatar
    this.draw();

    // attach to container
    this.container.addChild(this.graphics);
    this.container.addChild(this.nickname);
  }

  update(delta: number, floorY: number) {
    const direction = this.ai.update(delta);
    this.velocityX = direction * MOVE_SPEED;

    if (!this.grounded) {
      this.velocityY += GRAVITY;
    }

    this.container.x += this.velocityX;
    this.container.y += this.velocityY;

    // floor collision
    if (this.container.y + 40 >= floorY) {
      this.container.y = floorY - 40;
      this.velocityY = 0;
      this.grounded = true;
    } else {
      this.grounded = false;
    }

    // walls
    if (this.container.x <= 0) this.container.x = 0;

    if (this.container.x + 40 >= window.innerWidth) {
      this.container.x = window.innerWidth - 40;
    }
  }

  private draw() {
    this.graphics.clear();

    this.graphics.beginFill(this.stringToColor(this.user.userId));
    this.graphics.drawRect(0, 0, 40, 40);
    this.graphics.endFill();
  }

  private stringToColor(str: string) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash & 0xffffff;
  }
}