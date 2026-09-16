import React from "react";

type AceIconProps = React.SVGProps<SVGSVGElement>;

export default function AceIcon(props: AceIconProps) {
  return (
    <div className="hidden lg:flex justify-center items-center w-9 h-9  hover:bg-gray rounded-full cursor-pointer">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-6 h-6 text-yellow-500 fill-text"
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
          <path d="m14.857 22-1.58-1.991L12 18.4l-1.277 1.609L9.143 22H2.77A.771.771 0 0 1 2 21.229v-5.823c0-.164.052-.323.148-.455l.424-.58v-9.6c0-.31.306-.528.6-.426l5.356 1.87 2.849-3.9a.772.772 0 0 1 1.246 0l2.852 3.906 5.37-1.876c.295-.102.601.116.601.427v9.624l.405.555a.771.771 0 0 1 .149.455v5.822a.771.771 0 0 1-.771.772h-6.372Zm5.047-9.716V6.309l-3.478 1.214 3.478 4.76ZM7.577 7.518l-3.463-1.21v5.951l3.463-4.741Zm2.856 9.639L8.177 20H4v-4.193l8-10.954 8 10.954V20h-4.177l-2.256-2.843L12 15.183l-1.567 1.974Z" />
          <path
            d="M11.839 7.848a.2.2 0 0 1 .332 0l1.755 2.63a.2.2 0 0 1 0 .222l-1.754 2.649a.2.2 0 0 1-.333 0l-1.765-2.648a.2.2 0 0 1 0-.223l1.765-2.63Z"
            fill="currentColor"
          />
        </g>
      </svg>
    </div>
  );
}
