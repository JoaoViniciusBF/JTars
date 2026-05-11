import { WebSocketServer } from "ws";

export const wss = new WebSocketServer({ port: 3001 });

export function broadcast(data: any) {
  wss.clients.forEach((client: { send: (arg0: string) => void; }) => {
    client.send(JSON.stringify(data));
  });
}