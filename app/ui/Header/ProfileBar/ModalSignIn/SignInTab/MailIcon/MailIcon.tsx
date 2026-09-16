type MailIconProps = React.SVGProps<SVGSVGElement>;

export default function MailIcon(props: MailIconProps) {
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
        <path d="M20.3 5.5c.5 0 .9.4.9.9v11.2c0 .5-.4.9-.9.9H3.7c-.5 0-.9-.4-.9-.9V6.4c0-.5.4-.9.9-.9h16.6zm-1.1 2.7-6.1 5.1c-.7.6-1.6.6-2.3 0l-6-4.8v8.1h14.5V8.2zm-2-.8H6.4l5.5 4.4 5.3-4.4z"></path>
      </g>
    </svg>
  );
}
