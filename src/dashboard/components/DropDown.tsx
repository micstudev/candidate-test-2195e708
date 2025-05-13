import { useState } from "react";
import { WorkStatus } from "../../shared/types";
import { getOptionClass } from "../../helpers/getOptionClass";

interface Option {
  value: WorkStatus;
  label: string;
}

interface DropDownProps {
  selectValue: WorkStatus;
  onChange: (value: WorkStatus) => void; // Updated to accept a string directly
  options: Option[];
  classNames?: string;
}

export const DropDown = ({ selectValue, onChange, options, classNames }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (value: WorkStatus) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    // Custom dropdown, styled without select as easier (as this is an internal dashboard won't have SEO implications for semantic html)
    <div className={`relative w-full ${classNames}`}>
      <DropDownSelect isOpen={isOpen} setIsOpen={setIsOpen} selectValue={selectValue} options={options} />
      {isOpen && <DropDownOptions options={options} handleOptionClick={handleOptionClick} selectValue={selectValue} />}
    </div>
  );
};

const DropDownSelect = ({
  options,
  setIsOpen,
  isOpen,
  selectValue
}: {
  options: Option[];
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  selectValue: WorkStatus;
}) => {
  return (
    <div
      className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 shadow-sm cursor-pointer flex justify-between items-center transition-all duration-300 ease-in-out"
      onClick={() => setIsOpen(!isOpen)}>
      <span className={`${getOptionClass(selectValue)}`}>
        {options.find(option => option.value === selectValue)?.label || "Select an option"}
      </span>
      <svg
        className={`w-4 h-4 text-gray-500 transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );
};

const DropDownOptions = ({
  options,
  handleOptionClick,
  selectValue
}: {
  options: Option[];
  handleOptionClick: (value: WorkStatus) => void;
  selectValue: WorkStatus;
}) => {
  const Option = ({ option }: { option: Option }) => {
    return (
      <div
        key={option.value}
        onClick={() => handleOptionClick(option.value)}
        className={`p-3  hover:bg-gray-100 cursor-pointer transition-all duration-300 ease-in-out${
          option.value === selectValue ? "bg-gray-100 font-medium" : ""
        } ${getOptionClass(option.value)}`}>
        {option.label}
      </div>
    );
  };

  return (
    <div className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
      {options.map(option => (
        <Option option={option} />
      ))}
    </div>
  );
};
