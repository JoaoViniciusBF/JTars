import { jtars } from "./engine/engine";
import "./socket";


async function startApp() {
  // 1. Wait for PixiJS to initialize
  await jtars.init();

  // 2. Now start your chat providers/listeners
  // tw?.onMessage((msg) => jtars.spawn(msg));
  console.log("System initialized.");
}

startApp();

window.addEventListener("jtars:event", (e: any) => {
  const { type, payload } = e.detail;

  if (type === "chat") {
    jtars.spawn(payload);
  }

  if (type === "command") {
    jtars.command(payload);
  }
});