import { WebSocketServer, WebSocket } from "ws";

// These could change - but general thinking is that a user probably shouldn't be able to send more than 15 messages in a 10 second window from dropdowns
const RATE_LIMIT = 15; // Max 15 messages per 10 seconds
const RATE_LIMIT_WINDOW = 10000; // 10 seconds

const clientMessageCounts = new Map<WebSocket, { count: number; timer: NodeJS.Timeout }>();

/**
 *
 * @param webSocket WebSocket instance
 * @description This function handles rate limiting for WebSocket connections. It tracks the number of messages sent by each client and closes the connection if the limit is exceeded.
 * Uses a Map to store the message count and a timer for each client. If a client exceeds the rate limit, the connection is closed.
 * The timer is set to clear the message count after a specified window (10 seconds in this case).
 * @returns
 */
const handleRateLimiting = (webSocket: WebSocket) => {
  if (!clientMessageCounts.has(webSocket)) {
    clientMessageCounts.set(webSocket, {
      count: 0,
      timer: setTimeout(() => clientMessageCounts.delete(webSocket), RATE_LIMIT_WINDOW)
    });
  }

  const clientData = clientMessageCounts.get(webSocket)!;
  clientData.count++;

  if (clientData.count > RATE_LIMIT) {
    console.log("Rate limit exceeded, closing connection");
    webSocket.close(1011, "Rate limit exceeded"); // Close with 1011 internal error code
    return;
  }
};

/**
 *
 * @param message Incoming message from the client
 * @description This function sanitizes incoming messages from the client. Checks if the message is in the expected format (JSON) and contains the required fields.
 * If the message is invalid, it closes the connection.
 * @param webSocket
 */
const sanitizeIncomingMessage = (message: string, webSocket: WebSocket) => {
  try {
    const parsedMessage = JSON.parse(message);
    if (!parsedMessage.type || !parsedMessage.payload) {
      throw new Error("Invalid message format");
    }

    console.log("Received valid message:", parsedMessage);
  } catch (error) {
    console.log("Invalid message received, closing connection");
    webSocket.close(1003, "Invalid message format");
  }
};

// Web Socket server setup
const webSocketServer = new WebSocketServer({ port: 8080 });

webSocketServer.on("connection", (webSocket: WebSocket) => {
  console.log("Client connected");

  webSocket.on("message", (message: string) => {
    handleRateLimiting(webSocket);

    sanitizeIncomingMessage(message, webSocket);

    webSocketServer.clients.forEach(client => {
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
