import { jtars } from "./engine/engine";
import "./socket";

window.addEventListener("jtars:event", (e: any) => {
  const { type, payload } = e.detail;

  if (type === "chat") {
    jtars.spawn(payload);
  }

  if (type === "command") {
    jtars.command(payload);
  }
});