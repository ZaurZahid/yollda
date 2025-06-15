import React from 'react';

const CloseIcon = ({ fillColor }) => {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.492 0.375L6 4.86696L1.50804 0.375L0.375 1.50804L4.86696 6L0.375 10.492L1.50804 11.625L6 7.13304L10.492 11.625L11.625 10.492L7.13304 6L11.625 1.50804L10.492 0.375Z" fill="black" className={fillColor} />
        </svg>
    );
};

export default CloseIcon;
