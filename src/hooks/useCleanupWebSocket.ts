import { useEffect } from "react";
import toast from "react-hot-toast";

/**
 *
 * @param webSocket WebSocket instance to be cleaned up
 * @description This hook sets up a WebSocket connection and cleans it up when the component unmounts.
 * It also logs the connection status to the console.
 */
export const useManageWebSocketLifecycle = (webSocket: WebSocket | null) => {
  if (!webSocket) {
    toast.error("Real-time updates are unavailable. Please refresh the page or try again later.");
    return;
  }

  useEffect(() => {
    webSocket.onopen = () => console.log("WebSocket connected");
    webSocket.onerror = error => console.error("WebSocket error:", error);
    webSocket.onclose = () => console.log("WebSocket disconnected");

    // Clean up WebSocket connection on component unmount
    return () => {
      webSocket.close();
    };
  }, []);
};
