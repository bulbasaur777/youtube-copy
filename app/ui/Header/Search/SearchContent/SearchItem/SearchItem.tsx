import { IoClose } from "react-icons/io5";
import { FrequentRequestIcon } from "../FrequentRequestIcon/FrequentRequestIcon";
import Link from "next/link";

export default function SearchItem({
  item,
  onSelect,
}: {
  item: string;
  onSelect: () => void;
}) {
  return (
    <li>
      <Link
        href="/"
        onMouseDown={(event) => event.preventDefault()}
        onClick={onSelect}
        className="group flex justify-between items-center pl-4 py-2.5 rounded-lg hover:bg-gray-3 text-[0.9em] cursor-pointer"
      >
        <div className="flex gap-4 text-[1.08em] font-semibold">
          <FrequentRequestIcon /> {item}{" "}
        </div>

        <div className="flex items-center gap-1">
          <div className="bg-text h-6.5 w-12 rounded-sm"></div>
          <IoClose className="text-gray-4 text-[1.2em] mr-2" />
        </div>
      </Link>
    </li>
  );
}
