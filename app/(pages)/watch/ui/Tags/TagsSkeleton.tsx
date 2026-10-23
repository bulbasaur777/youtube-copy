export default function TagsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-hidden="true"
      className="h-[32px] w-full"
    >
      <div className="bg-bg/99 backdrop-blur-xl sm:sticky sm:top-[56px] sm:z-2">
        <div className="flex h-[32px] w-full items-center gap-3 overflow-hidden">
          {[96, 76, 88, 104, 82, 92].map((width, index) => (
            <div
              key={index}
              className="h-[28px] shrink-0 animate-pulse rounded-lg bg-[color-mix(in_srgb,var(--color-gray-3)_92%,black)]"
              style={{ width, opacity: "30%" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
