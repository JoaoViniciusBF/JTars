import * as PIXI from "pixi.js";
import { GRAVITY, MOVE_SPEED } from "./physics";
import { WanderAI } from "./movement";

export type JtarProps = {
  key?: number;
  name?: string;
  color?: string;
  scale?: number;
  skin?: string;
  direction?: number;
  isAnonymous?: boolean;
};

  export class JTar {
  public container: PIXI.Container;
  public body: PIXI.Graphics;
  public nickname: PIXI.Text;

  private height = 60;
  private width = 40;
  private velocityX = 0;
  private velocityY = 0;
  private grounded = false;

  private ai = new WanderAI();

  constructor(private user: any) {
    this.container = new PIXI.Container();

    // body
    this.body = new PIXI.Graphics();

    // nickname
    this.nickname = new PIXI.Text(user.displayName, {
      fontSize: 12,
      fill: 0xffffff,
      stroke: 0x000000,
      strokeThickness: 3,
    });

    this.nickname.anchor.set(0.5, 0.5);
    this.nickname.position.set(20, -5); 

    // draw avatar
    this.draw();

    // attach to container
    this.container.addChild(this.body);
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
    if (this.container.y + this.height >= floorY) {
      this.container.y = floorY - this.height;
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
    this.body.clear();

    this.body.beginFill(this.stringToColor(this.user.userId));
    this.body.drawRect(0, 0, this.width, this.height);
    this.body.endFill();
  }

  private stringToColor(str: string) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash & 0xffffff;
  }
}