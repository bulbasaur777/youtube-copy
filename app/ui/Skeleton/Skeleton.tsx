type Props = {
  className: string;
};

export default function Skeleton({ className }: Props) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse rounded-xl bg-[color-mix(in_srgb,var(--color-gray-3)_92%,black)] ${className}`}
    />
  );
}
