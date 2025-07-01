import React from "react";

export default function RadioSelect({ options, selectedOption, onChange }) {
    return (
        <div className="flex space-x-6">
            {options.map((option) => (
                <label
                    key={option.value}
                    className="flex items-center cursor-pointer"
                >
                    {/* Radio Button */}
                    <input
                        type="radio"
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={() => onChange(option.value)}
                        className="hidden"
                    />
                    <div
                        className={`w-4 h-4 flex items-center justify-center rounded-full border-2 ${selectedOption === option.value
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-400"
                            }`}
                    >
                        {selectedOption === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                    </div>
                    {/* Label Text */}
                    <span
                        className={`text-sm font-medium text-black ml-2`}
                    >
                        {option.label}
                    </span>
                </label>
            ))}
        </div>
    );
}
