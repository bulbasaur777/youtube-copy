type YouTubeIconProps = React.SVGProps<SVGSVGElement>;

export default function MenuIcon(props: YouTubeIconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      focusable="false"
      aria-hidden="true"
      className="size-6 fill-current text-text"
    >
      <path d="M12 4a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Zm0 6a2 2 0 100 4 2 2 0 000-4Z"></path>
    </svg>
  );
}
