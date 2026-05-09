import { LiveChat } from "youtube-chat";
import { ChatMessage } from "@jtars/core";

export class YouTubeProvider {
  private chat: LiveChat;

  constructor(private liveId: string) {
    this.chat = new LiveChat({ liveId });
  }

  onMessage(cb: (msg: ChatMessage) => void) {
    this.chat.on("chat", (data) => {
      cb({
        userId: data.author?.channelId ?? "",
        displayName: data.author?.name ?? "",
        message: data.message.map((p: any) => p.text ?? "").join(""),
        platform: "youtube"
      });
    });
  }

  start() {
    this.chat.start();
  }
}