import { SHORT_DURATION_ANIMATION_TIME, STATE_UPDATE_WORK_AVAILABILITY, STATUS_OPTIONS_ARRAY } from "../../constants";
import { getOptionClass } from "../../helpers/getOptionClass";
import { sendStateUpdateToWebSocket } from "../../helpers/sendStateUpdateToWebSocket";
import { WorkStatus } from "../../shared/types";

interface WorkStatusDropdownProps {
  onStatusChange: (status: WorkStatus) => void;
  webSocket: WebSocket;
  setDropdownOpen: (open: boolean) => void;
  options?: { value: WorkStatus; label: string }[];
}

export const WorkStatusDropdown = ({
  onStatusChange,
  webSocket,
  options = STATUS_OPTIONS_ARRAY,
  setDropdownOpen
}: WorkStatusDropdownProps) => {
  const handleStatusChange = (status: WorkStatus) => {
    onStatusChange(status);

    sendStateUpdateToWebSocket(STATE_UPDATE_WORK_AVAILABILITY, status, webSocket);

    setDropdownOpen(false);
  };

  return (
    <div className="relative top-full mt-2  bg-inherit rounded-md py-4 px-0  md:px-4  z-10  border-gray-200 ">
      <h4 className="text-sm font-medium text-gray-700 mb-2 break-words whitespace-normal">Update your work status:</h4>
      <ul className="space-y-2">
        {options.map(option => (
          <li
            key={option.value}
            onClick={() => handleStatusChange(option.value as WorkStatus)}
            className={`text-sm py-1.5 px-2 hover:bg-gray-100 rounded cursor-pointer transition-all ${SHORT_DURATION_ANIMATION_TIME} break-words whitespace-normal ${getOptionClass(
              option.value
            )}`}>
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
