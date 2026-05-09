// movement.ts
export class WanderAI {
  private moveTimer = 0;
  private direction = 0;

  update(delta: number) {
    this.moveTimer -= delta;

    // Change direction every ~1-3 seconds
    if (this.moveTimer <= 0) {
      this.moveTimer = 60 + Math.random() * 60;

      const dirs = [-1, 0, 1];
      this.direction = dirs[Math.floor(Math.random() * dirs.length)];
    }

    return this.direction;
  }
}