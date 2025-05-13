import toast from "react-hot-toast";

export const sendStateUpdateToWebSocket = (stateUpdateType: string, payload: string, webSocket: WebSocket) => {
  if (webSocket.readyState === WebSocket.OPEN) {
    webSocket.send(
      JSON.stringify({
        type: stateUpdateType,
        payload: payload
      })
    );
  } else {
    toast.error("WebSocket is not open. Unable to send message.");
  }
};
