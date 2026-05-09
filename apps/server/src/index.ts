import { TwitchProvider, YouTubeProvider } from "@jtars/chat";
import { handleCommand } from "@jtars/core";
import { eventBus } from "@jtars/events";
import { broadcast } from "./ws";

const want_tw = true;
const want_yt = false;

let tw: TwitchProvider | undefined;
let yt: YouTubeProvider | undefined;

if (want_tw) {
  tw = new TwitchProvider("calango");
}

if (want_yt) {
  yt = new YouTubeProvider("");
}


function onMessage(msg: { userId: string; message: string; }) {
  if (handleCommand(msg)) return;
  eventBus.emit("chat", msg);
}

tw?.onMessage(onMessage);
yt?.onMessage(onMessage);

tw?.start();
yt?.start();

eventBus.on("chat", (msg) => {
  broadcast({ type: "chat", payload: msg });
});

eventBus.on("command", (cmd) => {
  broadcast({ type: "command", payload: cmd });
});

console.log("Server running on ws://localhost:3001");