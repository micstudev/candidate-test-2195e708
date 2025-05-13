import { useSelector, useDispatch } from "react-redux";
import { NavRootState, NavDispatch } from "../store";
import { updateWorkStatus } from "../store/userSlice";
import { WorkStatus } from "../../shared/types";
import { useState } from "react";
import { sendStateUpdateToWebSocket } from "../../helpers/sendStateUpdateToWebSocket";
import {
  COLOUR_TRANSITION_WORK_STATUS,
  SHORT_DURATION_ANIMATION_TIME,
  STATE_UPDATE_WORK_AVAILABILITY,
  STATUS_LABELS
} from "../../constants";
import { useWebSocketListener } from "../../hooks/useWebSocketListener";
import { WorkStatusDropdown } from "../../dashboard/components/WorkStatusDropdown";
import { getOptionClass } from "../../helpers/getOptionClass";
import { useManageWebSocketLifecycle } from "../../hooks/useCleanupWebSocket";

export const UserAvatar = ({ webSocket }: { webSocket: WebSocket }) => {
  console.log("WebSocket in UserAvatar:", webSocket);
  const { profile } = useSelector((state: NavRootState) => state.user);
  const dispatch = useDispatch<NavDispatch>();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useManageWebSocketLifecycle(webSocket);
  useWebSocketListener(webSocket, dispatch, updateWorkStatus);

  const handleStatusChange = (status: WorkStatus) => {
    const stateUpdateType = STATE_UPDATE_WORK_AVAILABILITY;
    dispatch(updateWorkStatus(status));
    sendStateUpdateToWebSocket(stateUpdateType, status, webSocket);
    setDropdownOpen(false);
  };

  return (
    <div className="relative ">
      <div
        className={`flex items-center gap-3 cursor-pointer transition-all ${SHORT_DURATION_ANIMATION_TIME} hover:scale-105`}
        onClick={() => setDropdownOpen(!dropdownOpen)}>
        <img src={profile.avatar} alt={profile.name} className="w-10 h-10 rounded-full shadow-sm  hover:shadow-md" />
        <div className="flex flex-col">
          <span className={`font-medium transition-all ${SHORT_DURATION_ANIMATION_TIME} text-sm`}>{profile.name}</span>
          <span className={`text-xs ${COLOUR_TRANSITION_WORK_STATUS} ${getOptionClass(profile.workStatus)}`}>
            {STATUS_LABELS[profile.workStatus]}
          </span>
        </div>
      </div>

      {dropdownOpen && (
        <WorkStatusDropdown
          onStatusChange={handleStatusChange}
          webSocket={webSocket}
          setDropdownOpen={setDropdownOpen}
        />
      )}
    </div>
  );
};
