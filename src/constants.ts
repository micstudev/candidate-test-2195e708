import { WorkStatus } from "./shared/types";

export const STATE_UPDATE_WORK_AVAILABILITY = "workAvailability";

export const STATUS_LABELS: Record<WorkStatus, string> = {
  looking: "Currently looking for work",
  passive: "Passively looking for work",
  not_looking: "Don't want to hear about work"
};

export const STATUS_OPTIONS: WorkStatus[] = ["looking", "passive", "not_looking"];

interface StatusOption {
  value: WorkStatus;
  label: string;
}

export const STATUS_OPTIONS_ARRAY: StatusOption[] = STATUS_OPTIONS.map(status => ({
  value: status,
  label: STATUS_LABELS[status]
}));

export const SHORT_DURATION_ANIMATION_TIME = "duration-300 ease-in-out";

export const LONG_DURATION_ANIMATION_TIME = "duration-600   ease-in-out";

export const COLOUR_TRANSITION_WORK_STATUS = `transition-all ${LONG_DURATION_ANIMATION_TIME} opacity-100`;

export const WEB_SOCKET_URL = "ws://localhost:8080";
