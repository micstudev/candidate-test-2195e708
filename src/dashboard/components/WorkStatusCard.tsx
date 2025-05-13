import { useSelector, useDispatch } from "react-redux";
import { DashboardRootState, DashboardDispatch } from "../store";
import { updateWorkStatus } from "../store/userSlice";
import { WorkStatus } from "../../shared/types";
import {
  COLOUR_TRANSITION_WORK_STATUS,
  STATE_UPDATE_WORK_AVAILABILITY,
  STATUS_LABELS,
  STATUS_OPTIONS_ARRAY
} from "../../constants";
import { sendStateUpdateToWebSocket } from "../../helpers/sendStateUpdateToWebSocket";
import { useWebSocketListener } from "../../hooks/useWebSocketListener";
import { DropDown } from "./DropDown";
import { getOptionClass } from "../../helpers/getOptionClass";
import { useManageWebSocketLifecycle } from "../../hooks/useCleanupWebSocket";

export const WorkStatusCard = ({ webSocket, className = "" }: { webSocket: WebSocket; className?: string }) => {
  const { profile } = useSelector((state: DashboardRootState) => state.user);
  const dispatch = useDispatch<DashboardDispatch>();

  useManageWebSocketLifecycle(webSocket);
  useWebSocketListener(webSocket, dispatch, updateWorkStatus);

  const handleStatusChange = (newStatus: string) => {
    const stateUpdateType = STATE_UPDATE_WORK_AVAILABILITY;

    dispatch(updateWorkStatus(newStatus as WorkStatus));

    sendStateUpdateToWebSocket(stateUpdateType, newStatus, webSocket);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 h-full   ${className}`}>
      <h3 className="text-lg font-medium mb-4 pb-3 border-b border-gray-200">Your Work Status</h3>
      <div className="py-2 flex flex-col gap-y-4">
        <p>Update your availability for new opportunities:</p>
        <DropDown selectValue={profile.workStatus} onChange={handleStatusChange} options={STATUS_OPTIONS_ARRAY} />
        <p className=" text-gray-500">
          Your current status:{" "}
          <strong
            className={`underline decoration-${getOptionClass(
              profile.workStatus
            )} underline-offset-4 ${COLOUR_TRANSITION_WORK_STATUS} ${getOptionClass(profile.workStatus)}`}>
            {STATUS_LABELS[profile.workStatus]}
          </strong>
        </p>
      </div>
    </div>
  );
};
