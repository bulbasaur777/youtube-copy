export default function Tag({
  name,
  isActive = false,
}: {
  name: string;
  isActive?: boolean;
}) {
  return (
    <div
      className={`${isActive ? "!bg-text !text-bg !font-normal" : ""} flex-shrink-0 flex justify-center items-center text-center h-[32px] font-medium p-2 px-3 rounded-lg cursor-pointer text-[0.9em] duration-300 text-text bg-gray-10`}
    >
      {name}
    </div>
  );
}
