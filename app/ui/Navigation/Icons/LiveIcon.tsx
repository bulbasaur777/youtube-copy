import React from "react";

type AceIconProps = React.SVGProps<SVGSVGElement>;

export default function LiveIcon(props: AceIconProps) {
  return (
    <div className="flex justify-center items-center">
      <svg
        viewBox="0 0 22 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-6 h-3 text-yellow-500 fill-text"
        {...props}
      >
        <defs>
          <clipPath id="icon-ace-color_a">
            <rect width="24" height="24" />
          </clipPath>
          <linearGradient
            id="icon-ace-color_b"
            x1="0"
            y1="0"
            x2="1"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>

        <g
          clipPath="url(#icon-ace-color_a)"
          fillRule="evenodd"
          clipRule="evenodd"
        >
          <rect width="22" height="10" rx="1.5" fill="#DF4545"></rect>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 2.1v5.8a.1.1 0 0 0 .1.1h3.3a.1.1 0 0 0 .1-.1V6.715a.1.1 0 0 0-.1-.1H4.6V2.1a.1.1 0 0 0-.1-.1H3.1a.1.1 0 0 0-.1.1ZM7.367 2a.1.1 0 0 0-.1.1v5.8a.1.1 0 0 0 .1.1h1.3a.1.1 0 0 0 .1-.1V2.1a.1.1 0 0 0-.1-.1h-1.3Zm4.243 5.934-2.063-5.8A.1.1 0 0 1 9.642 2h1.386a.1.1 0 0 1 .095.069l1.044 3.162 1.044-3.162A.1.1 0 0 1 13.306 2h1.386a.1.1 0 0 1 .094.134l-2.062 5.8a.1.1 0 0 1-.095.066h-.925a.1.1 0 0 1-.094-.066ZM15.5 2.1v5.8a.1.1 0 0 0 .1.1h3.3a.1.1 0 0 0 .1-.1V6.715a.1.1 0 0 0-.1-.1H17v-.923h1.4a.1.1 0 0 0 .1-.1V4.408a.1.1 0 0 0-.1-.1H17v-.923h1.9a.1.1 0 0 0 .1-.1V2.1a.1.1 0 0 0-.1-.1h-3.3a.1.1 0 0 0-.1.1Z"
            fill="#fff"
          ></path>
        </g>
      </svg>
    </div>
  );
}
