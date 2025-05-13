import { WebSocketServer, WebSocket } from "ws";

const webSocketServer = new WebSocketServer({ port: 8080 });

webSocketServer.on("connection", (webSocket: WebSocket) => {
  console.log("Client connected");

  webSocket.on("message", (message: string) => {
    console.log("Received:", message);

    // Broadcast the message to all connected clients
    webSocketServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  webSocket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on websocket://localhost:8080");