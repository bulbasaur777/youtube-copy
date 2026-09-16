type LanguageIconProps = React.SVGProps<SVGSVGElement>;

export default function LanguageIcon(props: LanguageIconProps) {
  return (
    <div className="hidden lg:flex justify-center items-center w-9 h-9 hover:bg-gray rounded-full cursor-pointer">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-6 h-6 fill-text"
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
            d="M12 2c.122 0 .243.002.364.007L12 2a10.173 10.173 0 011.876.176C18.503 3.055 22 7.119 22 12c0 4.998-3.667 9.14-8.457 9.882l.333-.058a9.905 9.905 0 01-1.596.172L12 22l-.28-.004-.093-.003L12 22a10.173 10.173 0 01-.762-.029l-.04-.003a10.023 10.023 0 01-.847-.103l-.161-.028a9.957 9.957 0 01-.066-.013C5.497 20.945 2 16.881 2 12c0-4.961 3.613-9.079 8.351-9.865l.112-.018.028-.004.021-.003a10.022 10.022 0 011.105-.103h.01C11.75 2.002 11.875 2 12 2zm2.967 11H9.033a14.9 14.9 0 002.066 6.66l.189.307.27.021a8.092 8.092 0 00.117.005L12 20l.194-.002a8.143 8.143 0 00.244-.01l.273-.021.19-.308A14.897 14.897 0 0014.967 13zM7.03 13l-2.967.001a8.007 8.007 0 004.45 6.2l.108.052A16.91 16.91 0 017.03 13zm12.909.001h-2.967a16.904 16.904 0 01-1.592 6.252 8.007 8.007 0 004.559-6.252zM8.621 4.747l-.11.051A8.007 8.007 0 004.062 11H7.03c.129-2.226.687-4.338 1.592-6.253zM12 4l-.23.003-.042.002a8.102 8.102 0 00-.17.007l-.27.02-.189.31A14.897 14.897 0 009.033 11h5.934a14.9 14.9 0 00-2.066-6.66l-.19-.308-.273-.02a8.097 8.097 0 00-.108-.005L12 4zm3.38.747l.124.27A16.91 16.91 0 0116.971 11L19.938 11a8.007 8.007 0 00-4.558-6.253z"
            fillRule="nonzero"
          ></path>
        </g>
      </svg>
    </div>
  );
}
