import tmi from "tmi.js";
import { ChatMessage } from "@jtars/core";

export class TwitchProvider {
  private client;

  constructor(channel: string) {
    this.client = new tmi.Client({
      channels: [channel]
    });
  }

  onMessage(cb: (msg: ChatMessage) => void) {
    this.client.on("message", (_, tags, message) => {
      cb({
        userId: tags["user-id"]!,
        displayName: tags["display-name"]!,
        message,
        platform: "twitch"
      });
    });
  }

  async start() {
    await this.client.connect();
  }
}