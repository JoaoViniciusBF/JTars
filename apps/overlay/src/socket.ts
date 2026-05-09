export const socket = new WebSocket("ws://localhost:3001");

socket.onopen = () => {
  console.log("WS CONNECTADO");
};

socket.onmessage = (event) => {
  console.log("RAW WS:", event.data);

  const data = JSON.parse(event.data);

  window.dispatchEvent(
    new CustomEvent("jtars:event", { detail: data })
  );
};