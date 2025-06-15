import React from "react";

const Textarea = ({
  label,
  placeholder,
  value,
  onChange,
  required,
  error,
  classes: { root = "", input = "" },
  IconComponent,
  maxLength=''
}) => {
  return (
    <div className={`flex flex-col w-full ${root}`}>
      {label && (
        <label className={`py-2 font-medium ${error ? "text-red-400" : "text-black"} `}>
          {label}
          {required && "*"}
        </label>
      )}
      <div
        className={`rounded-md relative py-4 px-6 border ${error ? "bg-red-100 border-red-400" : "border-gray-400"
          } ${input}`}
      >
        <textarea
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          rows={4} // Default row size
          className="w-full outline-none bg-inherit font-medium resize-none"
          required={required}
        ></textarea>
        {IconComponent && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-4">
            {IconComponent}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
};

export default Textarea;
