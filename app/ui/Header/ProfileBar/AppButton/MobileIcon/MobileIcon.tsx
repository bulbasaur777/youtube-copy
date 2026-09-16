type MobileIconProps = React.SVGProps<SVGSVGElement>;

export default function MobileIcon(props: MobileIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
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
        <path
          d="M18 3a1 1 0 011 1v16a1 1 0 01-1 1H6a1 1 0 01-1-1V4a1 1 0 011-1h12zm-6 14a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm5-12H7v11h10V5z"
          id="icon-phone_a"
        ></path>
      </g>
    </svg>
  );
}
