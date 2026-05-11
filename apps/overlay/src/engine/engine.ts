import * as PIXI from "pixi.js";
import { Floor } from "./floor";
import { JTar } from "./jtar";

class JTarsEngine {
  private app: PIXI.Application;
  private viewers = new Map<string, JTar>();
  private floor!: Floor; // Use ! because it's initialized in init()

  constructor() {
    // Create the instance shell
    this.app = new PIXI.Application();
  }

  // ✅ v8 requires an async init method
  async init() {
    await this.app.init({
      resizeTo: window,
      backgroundAlpha: 0,
      backgroundColor: 0x3a93f8,
      antialias: true,
    });

    // In v8, app.view is now app.canvas
    document.body.appendChild(this.app.canvas);

    // Initialize floor
    this.floor = new Floor(window.innerWidth, window.innerHeight);
    this.app.stage.addChild(this.floor.graphics);

    // Update loop
    this.app.ticker.add((ticker) => {
      // ticker.deltaTime is the v8 standard
      const dt = ticker.deltaTime; 
      for (const jtar of this.viewers.values()) {
        jtar.update(dt, this.floor.y);
      }
    });

    window.addEventListener("resize", () => {
      this.floor.resize(window.innerWidth, window.innerHeight);
    });

    console.log("PixiJS v8 Engine Ready");
  }

  spawn(user: any) {
    if (this.viewers.has(user.userId)) return;

    const jtar = new JTar(user);
    this.app.stage.addChild(jtar.container);
    this.viewers.set(user.userId, jtar);
  }
}

export const jtars = new JTarsEngine();