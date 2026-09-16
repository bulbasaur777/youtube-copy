import * as Avatar from "@radix-ui/react-avatar";

export default function AvatarUI({ src, size }: { src: string; size: number }) {
  return (
    <Avatar.Root
      style={{ width: `${size}px`, height: `${size}px` }}
      className="inline-flex select-none items-center justify-center overflow-hidden rounded-full bg-blackA1 align-middle"
    >
      <Avatar.Image
        className="size-full rounded-[inherit] object-cover"
        src={src}
        alt="Colm Tuite"
      />
      <Avatar.Fallback
        className="leading-1 flex size-full items-center justify-center bg-gray-2 text-[15px] font-medium text-violet11"
        delayMs={600}
      >
        C
      </Avatar.Fallback>
    </Avatar.Root>
  );
}
