import React from 'react';

const Button = ({ text, IconComponent, onClick, disabled, classes }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center font-medium py-3 px-6 rounded-2xl transition duration-500 ease-in-out hover:shadow-lg overflow-hidden ${classes} ${disabled ? "bg-gray-200 hover:bg-gray-200 hover:shadow-none cursor-not-allowed" : ""}`}
        >
            {text}
            {IconComponent && (
                <span className="ml-2">
                    {IconComponent}
                </span>
            )}
        </button>
    );
};

export default Button;
