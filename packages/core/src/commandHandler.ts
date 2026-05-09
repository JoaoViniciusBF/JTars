import { eventBus } from "@jtars/events";

export function handleCommand(msg: { userId: string; message: string }) {
  if (!msg.message.startsWith("!")) return false;

  const cmd = msg.message.toLowerCase();

  eventBus.emit("command", {
    userId: msg.userId,
    command: cmd
  });

  return true;
}