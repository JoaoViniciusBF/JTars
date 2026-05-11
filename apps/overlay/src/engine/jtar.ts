import * as PIXI from "pixi.js";
import { GRAVITY, MOVE_SPEED } from "./physics";
import { WanderAI } from "./movement";

type JTarAnimationState = "idle" | "run" | "fall";

export class JTar {
  public container: PIXI.Container;
  public body: PIXI.Graphics;
  public nickname: PIXI.Text;

  private height = 60;
  private width = 40;

  private velocity: PIXI.PointData = { x: 0, y: 0 };
  private direction = 1;

  private animationState: JTarAnimationState = "idle";

  public isDead = false;
  private isDespawned = false;

  private floorY = 0;

  private ai = new WanderAI();

  constructor(private user: any) {
    this.container = new PIXI.Container();
    this.body = new PIXI.Graphics();

    // ✅ v8: stroke is now an object { color, width }, strokeThickness is removed
    const textStyle = new PIXI.TextStyle({
      fontSize: 14,
      fill: "#ffffff",
      stroke: { color: "#000000", width: 4 },
      fontWeight: "bold",
      align: "center",
      fontFamily: "Arial",
      padding: 4,
    });

    // ✅ v8: Text prefers the object constructor form
    this.nickname = new PIXI.Text({ text: user.displayName || user.userId, style: textStyle });
    this.nickname.anchor.set(0.5, 1);
    this.nickname.x = 0;
    this.nickname.y = -this.height - 5;

    this.draw();
    this.container.addChild(this.body);
    this.container.addChild(this.nickname);

    this.container.x = Math.random() * (window.innerWidth - 100) + 50;
    this.container.y = 0;
  }

  // ─────────────────────────────────────────────
  // Public API
  // ─────────────────────────────────────────────

  update(delta: number, floorY: number): void {
    if (this.isDespawned) return;
    this.floorY = floorY;
    if (!this.isDead) {
      this.move(delta);
    }
  }

  canDoAction(): boolean {
    return !this.isDead && !this.isDespawned;
  }

  die(): void {
    this.isDead = true;
    this.container.visible = false;
  }

  despawn(): void {
    this.isDespawned = true;
  }

  // ─────────────────────────────────────────────
  // Physics
  // ─────────────────────────────────────────────

  private move(delta: number): void {
    const position = {
      x: this.container.position.x,
      y: this.container.position.y,
    };

    const aiDirection = this.ai.update(delta);

    if (aiDirection !== 0) {
      this.direction = aiDirection;
      this.setAnimationState("run");
    } else {
      this.setAnimationState("idle");
    }

    this.velocity.x =
      this.animationState === "run" ? this.direction * MOVE_SPEED : 0;

    this.velocity.y += GRAVITY * delta;

    position.x += this.velocity.x * delta;
    position.y += this.velocity.y;

    if (this.isOnGround(position.y)) {
      position.y = this.floorY;
      this.velocity.y = 0;
      this.velocity.x = 0;
      this.setAnimationState("idle");
    } else if (this.velocity.y > 0) {
      this.setAnimationState("fall");
    }

    const halfWidth = this.width / 2;

    if (position.x - halfWidth < 0) {
      position.x = halfWidth;
      this.direction = 1;
      this.velocity.x = Math.abs(this.velocity.x);
    } else if (position.x + halfWidth > window.innerWidth) {
      position.x = window.innerWidth - halfWidth;
      this.direction = -1;
      this.velocity.x = -Math.abs(this.velocity.x);
    }

    this.container.position.set(position.x, position.y);
  }

  isOnGround(y: number): boolean {
    return y >= this.floorY;
  }

  private setAnimationState(state: JTarAnimationState): void {
    this.animationState = state;
  }

  // ─────────────────────────────────────────────
  // Rendering — v8 Graphics API
  // ─────────────────────────────────────────────

  private draw(): void {
    this.body.clear();
    const color = this.stringToColor(this.user.userId);

    // ✅ v8: build shape → .fill() → .stroke({ ... })
    // No more lineStyle / beginFill / endFill
    this.body
      .roundRect(-this.width / 2, -this.height, this.width, this.height, 5)
      .fill(color)
      .stroke({ width: 2, color: 0x000000 });

    const eyeSize = 4;
    const eyeY = -this.height + this.height * 0.3;

    // ✅ v8: drawCircle → .circle(), chained fill
    for (const ex of [-8, 8]) {
      this.body.circle(ex, eyeY, eyeSize).fill(0xffffff);
      this.body.circle(ex, eyeY, eyeSize - 2).fill(0x000000);
    }
  }

  private stringToColor(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash & 0xffffff;
  }
}