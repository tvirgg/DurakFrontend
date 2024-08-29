import * as React from "react";
const IconRefresh = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    className="icon iconRefresh"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        stroke="#F3F3F3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4}
        d="M25.875 4.5v6.75m0 0h-6.75m6.75 0-5.22-4.905a10.125 10.125 0 0 0-16.706 3.78M1.125 22.5v-6.75m0 0h6.75m-6.75 0 5.22 4.905a10.125 10.125 0 0 0 16.706-3.78"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h27v27H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default IconRefresh;
