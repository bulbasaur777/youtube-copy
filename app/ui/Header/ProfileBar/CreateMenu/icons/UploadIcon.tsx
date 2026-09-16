type Props = React.SVGProps<SVGSVGElement>;

export default function UploadIcon(props: Props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h18a2 2 0 002-2V5a2 2 0 00-2-2ZM3 19V5h18v14H3Zm13-7L9.5 8v8l6.5-4Z"></path>
    </svg>
  );
}
