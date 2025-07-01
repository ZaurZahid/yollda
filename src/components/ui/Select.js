import React, { useEffect, useRef, useState } from 'react';

const CustomSelect = ({
    IconComponent,
    options = [],
    label,
    value = [], // Supports multiple values as an array
    onChange,
    required,
    error,
    placeholder,
    multiple = false, // Add `multiple` prop
    classes: { root = "", select = "", option = "" } = {},
}) => {
    const dropdownRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    // Close the dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSelect = (optionValue) => {
        if (multiple) {
            // Handle multiple selection
            const newValue = value.includes(optionValue)
                ? value.filter((item) => item !== optionValue) // Remove if already selected
                : [...value, optionValue]; // Add new option
            onChange({ target: { value: newValue } }); // Simulate select's onChange event
        } else {
            // Handle single selection
            onChange({ target: { value: optionValue } });
            setIsOpen(false);
        }
    };

    return (
        <div className={`flex flex-col w-full ${root}`} ref={dropdownRef}>
            {label && (
                <label
                    className={`py-2 font-medium ${error ? "text-red-400" : "text-black"}`}
                >
                    {label}
                    {required && "*"}
                </label>
            )}
            <div
                className={`relative border rounded-md ${error ? "bg-red-100 border-red-400" : "border-gray-400"} ${select}`}
            >
                <div
                    className={`w-full py-4 px-6 rounded-md bg-white font-medium cursor-pointer flex items-center justify-between ${value.length > 0 ? "text-black" : "text-gray-400"
                        }`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span>
                        {value.length > 0
                            ? options
                                .filter((opt) => value.includes(opt.value))
                                .map((opt) => opt.label)
                                .join(", ")
                            : placeholder}
                    </span>
                    {IconComponent && <span className="ml-4">{IconComponent}</span>}
                </div>
                {isOpen && (
                    <ul
                        className={`absolute top-full left-0 w-full mt-2 bg-white rounded-md shadow-lg z-10 border border-gray-400`}
                    >
                        {options.map((option, index) => (
                            <li
                                key={index}
                                className={`py-2 px-4 hover:bg-gray-100 cursor-pointer font-medium flex items-center space-x-2 ${multiple && value.includes(option.value) ? "bg-blue-50" : ""
                                    }`}
                                onClick={() => handleSelect(option.value)}
                            >
                                {/* Tick Icon */}
                                <span
                                    className={`w-4 h-4 border-2 rounded-sm ${multiple && value.includes(option.value)
                                            ? "bg-blue-500 border-blue-500"
                                            : "border-gray-300"
                                        }`}
                                ></span>
                                <span>{option.label}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        </div>
    );
};

export default CustomSelect;
