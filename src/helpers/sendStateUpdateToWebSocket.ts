export const sendStateUpdateToWebSocket = (stateUpdateType: string, payload: string, webSocket: WebSocket) => {
  console.log("Sending state update to WebSocket:", stateUpdateType, payload);
  if (webSocket.readyState === WebSocket.OPEN) {
    console.log("WebSocket is open. Sending message...");
    webSocket.send(
      JSON.stringify({
        type: stateUpdateType,
        payload: payload
      })
    );
  } else {
    console.error("WebSocket is not open. Unable to send message.");
  }
};
