import React from 'react'

const Devices = ({ className, fillColor }) => {
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
            <path className={fillColor} d="M29.3333 5.33301C29.3333 3.11967 27.5467 1.33301 25.3333 1.33301H4C1.78667 1.33301 0 3.11967 0 5.33301V23.9997H13.3333V26.6663H8V29.333H16V15.9997C16 12.3197 18.9867 9.33301 22.6667 9.33301H29.3333V5.33301ZM32 31.9997H18.6667V15.9997C18.6667 13.7997 20.4667 11.9997 22.6667 11.9997H28C30.2 11.9997 32 13.7997 32 15.9997V31.9997Z" />
        </svg>
    )
}

export default Devices