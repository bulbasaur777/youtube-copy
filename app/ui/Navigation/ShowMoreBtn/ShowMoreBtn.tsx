import { LuChevronDown } from "react-icons/lu";

export default function ShowMoreBtn({
  title,
  isNavbarOpen,
  onClick,
}: {
  title: string;
  isNavbarOpen: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group flex items-center pl-3 py-2 hover:bg-gray-10 cursor-pointer rounded-lg`}
    >
      <LuChevronDown className="size-6 mt-[2px] mr-5.5" />
      <div className={`ml-1 mt-[2px] text-text text-sm`}>{title}</div>
    </div>
  );
}
