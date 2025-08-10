const FlashIcon = ({ size = 22, color = "#6B7280", ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.966 9.92561H13.3696V3.87561C13.3696 2.46395 12.6049 2.17825 11.6722 3.237L11 4.00165L5.31132 10.4718C4.52986 11.3541 4.85757 12.0767 6.03396 12.0767H8.63042V18.1267C8.63042 19.5384 9.39507 19.8241 10.3278 18.7653L11 18.0007L16.6887 11.5305C17.4701 10.6483 17.1424 9.92561 15.966 9.92561Z"
      fill={color}
    />
  </svg>
);

export default FlashIcon;
