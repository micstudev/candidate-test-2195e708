import { WorkStatus } from "../shared/types";

export const getOptionClass = (value: WorkStatus) => {
  console.log("getOptionClass", value);
  switch (value) {
    case "looking":
      return "text-red-400";
    case "passive":
      return "text-[#646cff]";
    case "not_looking":
      return "text-gray-700";
    default:
      return "text-gray-700";
  }
};
