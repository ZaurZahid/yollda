import { useRef, useState } from "react";
import ArrowDown from "../ui/icons/ArrowDown";
import PlusCircleIcon from "../ui/icons/PlusCircleIcon";
import TickCircle from "../ui/icons/TickCircle";
import TrashBinIcon from "../ui/icons/TrashBinIcon";

const InputType = {
  TEXT: 0,
  SELECT: 1,
  CHECKBOX: 2,
  FILE: 3,
};

const InputWrapper = ({
  type = InputType.TEXT,
  value,
  placeholder,
  fileName,
  fileExparationDate,
  handleFileDelete,
  label,
  errors,
  description,
  handleInputChange,
  handleFileModalOpen,
  optionDescription = "",
  options = [],
  ...props
}) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropDownRef = useRef(null);

  switch (type) {
    case InputType.TEXT:
      return (
        <div className="flex flex-col gap-2">
          {label && (
            <label className="font-semibold text-[14px] text-gray-700">
              {label}
            </label>
          )}
          <input
            {...props}
            placeholder={placeholder}
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            className={`w-full border ${
              errors ? "border-red-400" : "border-gray-200"
            } rounded-xl px-4 py-2 text-gray-900 placeholder-gray-500 
                  bg-gray-50 focus:bg-white 
                  focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent 
                  transition-all duration-200 text-input-responsive`}
          />
          {description && (
            <p className="text-gray-400 text-[14px] font-medium">
              {description}
            </p>
          )}
          {errors && (
            <p className="text-red-500 text-span-small-responsive mt-1">
              {errors}
            </p>
          )}
        </div>
      );
    case InputType.SELECT:
      return (
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-[14px] text-gray-700">
            {label}
          </label>
          <div className="relative" ref={dropDownRef}>
            <button
              type="button"
              onClick={() => setIsDropDownOpen(!isDropDownOpen)}
              className={`w-full border ${
                errors ? "border-red-400" : "border-gray-300"
              } rounded-xl px-4 py-2 text-left flex items-center justify-between text-gray-900 hover:bg-gray-200 transition-colors duration-200
                                            ${
                                              isDropDownOpen & !errors
                                                ? "focus:outline-none focus:ring-2 focus:ring-light-green focus:border-transparent"
                                                : ""
                                            }
                                        `}
            >
              <span
                className={`text-input-responsive ${
                  value ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {value || placeholder}
              </span>
              <ArrowDown
                strokeColor={`stroke-gray-500`}
                className={`transition-transform duration-200 !ms-auto ${
                  isDropDownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropDownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-30 max-h-60 overflow-y-auto custom-contact-scrollbar">
                {type === InputType.SELECT &&
                  options?.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => {
                        handleInputChange(option);
                        setIsDropDownOpen(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-200 transition-colors duration-200 text-span-responsive first:rounded-t-xl last:rounded-b-xl text-gray-700"
                    >
                      {option}
                    </button>
                  ))}
              </div>
            )}
          </div>
          {description && (
            <p className="text-gray-400 text-[14px] font-medium">
              {description}
            </p>
          )}
          {errors && (
            <p className="text-red-500 text-span-small-responsive mt-1">
              {errors}
            </p>
          )}
        </div>
      );

    case InputType.CHECKBOX:
      return (
        <div className="flex flex-col gap-2 border-b-2 border-b-gray-300 pb-5">
          {label && (
            <label className="font-semibold text-[14px] text-gray-700">
              {label}
            </label>
          )}

          {description && (
            <p className="text-gray-400 text-[14px] font-medium">
              {description}
            </p>
          )}

          <div className="relative flex gap-1 mt-1">
            <input
              type="checkbox"
              checked={value}
              onChange={(e) => handleInputChange(e.target.checked)}
              className="sr-only"
            />
            <button
              type="button"
              onClick={() => handleInputChange(!value)}
              className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                value
                  ? "bg-light-green border-light-green"
                  : errors
                  ? "border-red-400"
                  : "border-gray-300 hover:border-light-green"
              }`}
            >
              {value && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
            {optionDescription && (
              <div>
                <p className="text-span-small-responsive text-gray-500 leading-relaxed">
                  {optionDescription}
                </p>
              </div>
            )}
          </div>
          {errors && (
            <p className="text-red-500 text-span-small-responsive mt-1">
              {errors}
            </p>
          )}
        </div>
      );
    case InputType.FILE:
      return (
        <div className="flex flex-col gap-2 border-b-2 border-b-gray-300 pb-5">
          {label && (
            <div className="flex justify-between items-center">
              <label className="font-semibold text-[14px] text-gray-700">
                {label}
              </label>
              {fileName && (
                <div className="bg-light-secondary-green rounded-[10px] w-[50px] h-[28px] flex justify-center items-center">
                  <TickCircle fill="white" />
                </div>
              )}
            </div>
          )}
          {description && (
            <p className="text-gray-400 text-[14px] font-medium">
              {description}
            </p>
          )}
          {fileName ? (
            <div className="flex justify-between items-center">
              <div className=" flex flex-col ">
                <p className="text-[14px] font-medium text-gray-600">
                  {fileName}
                </p>
                {fileExparationDate && (
                  <p className="text-gray-400 font-semibold text-[14px]">
                    Expires: {fileExparationDate}
                  </p>
                )}
              </div>
              <button type="button" onClick={handleFileDelete}>
                <TrashBinIcon />
              </button>
            </div>
          ) : (
            <button
              onClick={handleFileModalOpen}
              type="button"
              className="rounded-[10px] py-[10px] px-[16px] bg-gray-100 hover:bg-gray-300 transition text-[#4B5563] text-[14px] max-w-[90px] flex items-center gap-2"
            >
              <PlusCircleIcon /> Add
            </button>
          )}
        </div>
      );

    default:
      break;
  }
};

export default InputWrapper;
