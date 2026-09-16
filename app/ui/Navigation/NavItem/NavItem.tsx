export default function NavItem({
  title,
  path,
  activePath,
  isActive = false,
  compactMode = false,
}: {
  title: string;
  path: React.ReactNode;
  activePath?: React.ReactNode;
  isActive?: boolean;
  compactMode?: boolean;
}) {
  return (
    <div
      className={`group flex pl-3 py-2 hover:bg-gray-10 cursor-pointer text-[0.9rem] ${!compactMode ? "rounded-lg" : ""} ${isActive ? "bg-gray-10" : ""}`}
    >
      {isActive ? (
        <svg
          aria-hidden="true"
          className={`w-[25px] h-[25px] fill-current transition-colors text-text`}
        >
          {activePath}
        </svg>
      ) : (
        <svg
          aria-hidden="true"
          className={`w-[25px] h-[25px] fill-current transition-colors text-text`}
        >
          {path}
        </svg>
      )}

      <div
        className={` mt-[2px] text-text ${compactMode ? "ml-2.5" : "ml-6"} ${
          isActive ? "font-semibold" : "group-hover:text-text"
        }`}
      >
        {title}
      </div>
    </div>
  );
}
