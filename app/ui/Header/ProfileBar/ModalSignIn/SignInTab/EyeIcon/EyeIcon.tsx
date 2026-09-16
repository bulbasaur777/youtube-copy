"use client";

type EyeIconProps = React.SVGProps<SVGSVGElement> & {
  isOpen: boolean;
};

type CloseOpenEyeIconProps = React.SVGProps<SVGSVGElement>;

export function EyeIcon({ isOpen, ...props }: EyeIconProps) {
  return (
    <div>
      {isOpen ? <OpenEyeIcon {...props} /> : <CloseEyeIcon {...props} />}
    </div>
  );
}

function CloseEyeIcon(props: CloseOpenEyeIconProps) {
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
          d="M19.523 9.147a1 1 0 01.33 1.376 10.368 10.368 0 01-1.746 2.17l.6.6-1.414 1.414-.816-.814c-1.04.585-2.2.94-3.476 1.06L13 16h-2v-1.046c-1.277-.12-2.438-.476-3.477-1.061l-.816.814-1.414-1.414.6-.6a10.368 10.368 0 01-1.746-2.17 1 1 0 011.706-1.046C7.307 11.85 9.319 13 12 13s4.693-1.15 6.147-3.523a1 1 0 011.376-.33z"
          fillRule="nonzero"
        ></path>
      </g>
    </svg>
  );
}

function OpenEyeIcon(props: CloseOpenEyeIconProps) {
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
        <path d="M12 6c3.839 0 6.833 1.871 8.872 5.511l.278.496-.468.811C18.65 16.243 15.72 18 12 18c-3.72 0-6.649-1.757-8.689-5.193l-.461-.8.278-.496C5.168 7.871 8.16 6 12 6Zm0 2c1.018 0 1.948.38 2.654 1.007a1.5 1.5 0 1 0 1.236 2.058 4 4 0 1 1-4.09-3.06L12 8c-2.893 0-5.127 1.28-6.791 3.923l-.048.076.046.076c1.608 2.553 3.744 3.835 6.496 3.92L12 16c2.995 0 5.28-1.371 6.956-4.192l-.118.191-.047-.076c-1.607-2.552-3.745-3.833-6.494-3.918L12 8Z"></path>
      </g>
    </svg>
  );
}
