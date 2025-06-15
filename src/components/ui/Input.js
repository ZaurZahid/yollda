import React from 'react';

const Input = ({ IconComponent, IconStartComponent = '', type, placeholder, label, value, onChange, required, error, classes: { root = "", input = "" } }) => {
    return (
        <div className={`flex flex-col w-full ${root}`}>
            {label && <label className={`py-2 font-medium ${error ? "text-red-400" : "text-black"} `}>{label}{required && '*'}</label>}
            <div className={`flex items-center rounded-md relative py-4 px-6 border ${error ? "bg-red-100 border-red-400" : "border-gray-400"} ${input}`}>
                {IconStartComponent && (
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                        {IconStartComponent}
                    </span>
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`w-full outline-none bg-inherit font-medium ${IconComponent ? "pr-6" : "pr-0"} ${IconStartComponent ? "pl-6" : ""}`}
                    required={required}
                />
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

export default Input;
