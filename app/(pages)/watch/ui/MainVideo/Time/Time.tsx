import { formatTime } from "@/lib/services/formatTime";

type Props = {
  duration: number;
  currentTime: number;
};

export default function Time({ duration, currentTime }: Props) {
  return (
    <div className="text-white cursor-default select-none">
      {formatTime(currentTime)} / {formatTime(duration)}
    </div>
  );
}
