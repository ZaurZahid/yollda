import React from 'react';

const ArrowIcon = ({ strokeColor }) => {
    return (
        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.025 5.27515L17.0833 10.3335L12.025 15.3918" className={strokeColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2.91667 10.3335H16.9417" className={strokeColor} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
};

export default ArrowIcon;
