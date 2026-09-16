export default function CompactNavItem({
  title,
  path,
  activePath,
  isActive = false,
}: {
  title: string;
  path: React.ReactNode;
  activePath?: React.ReactNode;
  isActive?: boolean;
}) {
  return (
    <div className="group flex flex-col gap-1.5 justify-center items-center py-4 hover:bg-gray-10 cursor-pointer text-[0.9rem] rounded-lg">
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

      <div className={`text-text text-[0.6rem] `}>{title}</div>
    </div>
  );
}
