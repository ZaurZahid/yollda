import React from 'react'

function LinkIcon({ className, strokeColor }) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.5938 12.5127L16.3634 11.7431C17.9027 10.2039 17.9078 7.68097 16.3634 6.13663C14.8242 4.59739 12.3013 4.59229 10.7569 6.13663L9.9873 6.90625" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M6.93447 9.95957L6.16995 10.7241C4.62561 12.2684 4.62561 14.7863 6.16995 16.3306C7.70919 17.8698 10.2321 17.8749 11.7764 16.3306L12.541 15.5661" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.22803 13.2715L13.3055 9.19403" className={strokeColor} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

export default LinkIcon