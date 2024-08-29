import * as React from "react";
const IconAlertCircle = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    className="icon iconAlertCircle"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M12 8v4m0 4h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default IconAlertCircle;
