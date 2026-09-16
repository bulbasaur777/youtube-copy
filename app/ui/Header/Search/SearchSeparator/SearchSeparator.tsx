export function SearchSeparator({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="flex w-full h-[2px] justify-center">
      <div
        className={`bg-brand h-[2px] transition-all duration-300 ease-out z-10 ${
          isOpen
            ? "opacity-100 w-full pointer-events-auto"
            : "opacity-0 w-0 pointer-events-none"
        }`}
      ></div>
    </div>
  );
}
