export interface ChatMessage {
  userId: string;
  displayName: string;
  message: string;
  platform: "twitch" | "youtube";
}