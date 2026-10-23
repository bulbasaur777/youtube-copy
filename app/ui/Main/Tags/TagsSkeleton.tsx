export default function TagsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-hidden="true"
      className="sticky top-[56px] z-2 w-full animate-pulse bg-bg/99 px-2 py-1 pb-1 backdrop-blur-xl sm:px-6"
      style={{ opacity: "30%" }}
    >
      <div className="relative my-1 flex h-[40px] w-full items-center">
        <div className="flex h-[40px] w-full items-center gap-3 overflow-hidden">
          {[96, 76, 88, 104, 82, 92, 72, 100].map((width, index) => (
            <div
              key={index}
              className="h-[32px] shrink-0 rounded-lg bg-gray-4"
              style={{ width }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
