import { useRef, useState } from "react";
import ArrowDown from "../ui/icons/ArrowDown";

const InputType = {
  TEXT: 0,
  SELECT: 1,
};

const InputWrapper = ({
  type = InputType.TEXT,
  value,
  placeholder,
  label,
  errors,
  handleInputChange,
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
          {errors && (
            <p className="text-red-500 text-span-small-responsive mt-1">
              {errors}
            </p>
          )}
        </div>
      );
    case InputType.SELECT:
      return (
        <div>
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
          {errors && (
            <p className="text-red-500 text-span-small-responsive mt-1">
              {errors}
            </p>
          )}
        </div>
      );
    default:
      break;
  }
};

export default InputWrapper;
