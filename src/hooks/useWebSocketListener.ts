import { useEffect } from "react";
import { STATE_UPDATE_WORK_AVAILABILITY } from "../constants";
import { parseWebSocketMessage } from "../helpers/parseWebSocketMessage";
import { Action, AnyAction, Dispatch } from "@reduxjs/toolkit";
import { WorkStatus } from "../shared/types";

export const useWebSocketListener = (
  webSocket: WebSocket,
  dispatch: Dispatch<Action>,
  updateAction: (payload: WorkStatus) => Action
) => {
  useEffect(() => {
    console.log("Listening for WebSocket messages...");
    webSocket.onmessage = async (event: MessageEvent) => {
      const data = await parseWebSocketMessage(event);

      if (data.type === STATE_UPDATE_WORK_AVAILABILITY) {
        console.log("Received state update:", data.payload);
        dispatch(updateAction(data.payload));
      }
    };

    return () => {
      webSocket.close();
    };
  }, [dispatch, updateAction, webSocket]);
};
