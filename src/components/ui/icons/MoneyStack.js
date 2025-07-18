import React from "react";

function MoneyStack({ className, fillColor }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        className={fillColor}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.88889 2C4.2934 2 3 3.2536 3 4.8V16C3 17.5464 4.2934 18.8 5.88889 18.8H26.1111C27.7066 18.8 29 17.5464 29 16V4.8C29 3.2536 27.7066 2 26.1111 2H5.88889ZM23.2222 4.8H26.1111V7.6C24.5156 7.6 23.2222 6.3464 23.2222 4.8ZM8.77778 4.8H5.88889V7.6C7.48438 7.6 8.77778 6.3464 8.77778 4.8ZM5.88889 13.2V16H8.77778C8.77778 14.4536 7.48438 13.2 5.88889 13.2ZM23.2222 16H26.1111V13.2C24.5156 13.2 23.2222 14.4536 23.2222 16ZM20.3333 10.4C20.3333 12.7196 18.3933 14.6 16 14.6C13.6067 14.6 11.6667 12.7196 11.6667 10.4C11.6667 8.08041 13.6067 6.2 16 6.2C18.3933 6.2 20.3333 8.08041 20.3333 10.4ZM4.44444 24.4V21.6H27.5556V24.4H4.44444ZM5.88889 27.2V30H26.1111V27.2H5.88889Z"
      />
    </svg>
  );
}

export default MoneyStack;
