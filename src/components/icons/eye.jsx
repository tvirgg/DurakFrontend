import * as React from "react";
const IconEye = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={27}
    height={27}
    fill="none"
    className="icon iconEye"
    {...props}
  >
    <g
      stroke="#F3F3F3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      clipPath="url(#a)"
    >
      <path d="M1.125 13.5s4.5-9 12.375-9 12.375 9 12.375 9-4.5 9-12.375 9-12.375-9-12.375-9Z" />
      <path d="M13.5 16.875a3.375 3.375 0 1 0 0-6.75 3.375 3.375 0 0 0 0 6.75Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h27v27H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default IconEye;
