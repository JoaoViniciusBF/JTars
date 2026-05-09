// engine.ts
import * as PIXI from "pixi.js";
import { Floor } from "./floor";
import { JTar } from "./jtar";


class JTarsEngine {
  private app: PIXI.Application;
  private viewers = new Map<string, JTar>();
  private floor: Floor;

  constructor() {
    this.app = new PIXI.Application({
      resizeTo: window,
      backgroundAlpha: 0,
      backgroundColor: 0x3a93f8
    });
    
  this.app.ticker.add((ticker) => {
  for (const jtar of this.viewers.values()) {
    jtar.update(
      ticker,
      this.floor.y
    );
  }
});

    document.body.appendChild(this.app.view as any);

    // Create floor
    this.floor = new Floor(window.innerWidth, window.innerHeight);
    this.app.stage.addChild(this.floor.graphics);

    // Resize floor with window
    window.addEventListener("resize", () => {
      this.floor.resize(window.innerWidth, window.innerHeight);
    });
  }

  spawn(user: any) {
    if (this.viewers.has(user.userId)) return;

    const jtar = new JTar(user);

    jtar.graphics.x = Math.random() * window.innerWidth;
    jtar.graphics.y = Math.random() * window.innerHeight;

    this.app.stage.addChild(jtar.container);

    this.viewers.set(user.userId, jtar);

    console.log("Spawn avatar:", user.displayName);
  }

  command(data: any) {
    console.log("Command:", data.command);
  }
}

export const jtars = new JTarsEngine();