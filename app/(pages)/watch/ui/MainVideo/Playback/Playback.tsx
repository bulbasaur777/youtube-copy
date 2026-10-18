import PauseIcon from "../../../icons/PauseIcon";
import PlayIcon from "../../../icons/PlayIcon";

type Props = {
  isPlaying: boolean;
  onToggle: () => void;
};

export default function Playback({ isPlaying, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "Pause" : "Play"}
      className="cursor-pointer"
    >
      {isPlaying ? <PauseIcon /> : <PlayIcon />}
    </button>
  );
}
