import { TwitchProvider, YouTubeProvider } from "@jtars/chat";
import { handleCommand } from "@jtars/core";
import { eventBus } from "@jtars/events";
import { broadcast } from "./ws";

const want_tw = true;
const want_yt = false;

let tw: TwitchProvider | undefined;
let yt: YouTubeProvider | undefined;

if (want_tw) {
  // Replace with your channel
  tw = new TwitchProvider("cellbit");
}

if (want_yt) {
  yt = new YouTubeProvider("");
}

// Fixed onMessage to ensure we capture the correct fields
function onMessage(msg: any) {
  // We ensure the payload has what JTar needs
  const payload = {
    userId: msg.userId,
    displayName: msg.displayName || msg.username || msg.userId,
    message: msg.message
  };

  if (handleCommand(payload)) return;
  eventBus.emit("chat", payload);
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