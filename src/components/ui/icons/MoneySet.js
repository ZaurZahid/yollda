import React from "react";

function MoneySet({ className, fillColor }) {
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
        d="M3.55556 6C1.59188 6 0 7.567 0 9.5V23.5C0 25.4331 1.59188 27 3.55556 27H28.4444C30.4082 27 32 25.4331 32 23.5V9.5C32 7.567 30.4082 6 28.4444 6H3.55556ZM24.8889 9.5H28.4444V13C26.4807 13 24.8889 11.433 24.8889 9.5ZM7.11111 9.5H3.55556V13C5.51924 13 7.11111 11.433 7.11111 9.5ZM3.55556 20V23.5H7.11111C7.11111 21.5669 5.51924 20 3.55556 20ZM24.8889 23.5H28.4444V20C26.4807 20 24.8889 21.5669 24.8889 23.5ZM21.3333 16.5C21.3333 19.3995 18.9456 21.75 16 21.75C13.0544 21.75 10.6667 19.3995 10.6667 16.5C10.6667 13.6005 13.0544 11.25 16 11.25C18.9456 11.25 21.3333 13.6005 21.3333 16.5Z"
      />
    </svg>
  );
}

export default MoneySet;
