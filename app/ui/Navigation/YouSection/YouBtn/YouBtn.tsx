import { LuChevronRight } from "react-icons/lu";

export default function YouBtn({
  title,
  isNavbarOpen,
}: {
  title: string;
  isNavbarOpen: boolean;
}) {
  return (
    <div
      className={`group flex items-center pl-2 py-2 hover:bg-gray-10 cursor-pointer rounded-lg`}
    >
      <div className={`ml-1 mt-[2px] text-text font-medium`}>{title}</div>
      <LuChevronRight className="size-4 mt-[2px] ml-2" />
    </div>
  );
}
