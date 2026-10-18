import FullScreenIcon from "../../../icons/FullScreenIcon";
import RegularScreenIcon from "../../../icons/RegularScreenIcon";
import { useVideo } from "@/contexts/VideoContext";
import TooltipUI from "../TooltipUI/TooltipUI";

type Props = {
  isFullScreenMode: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export default function FullScreenMode({
  isFullScreenMode,
  onToggle,
  disabled = false,
}: Props) {
  const { playerContainerRef, isFullScreenMode: isPlayerFullscreen } =
    useVideo();

  return (
    <TooltipUI
      content={
        isFullScreenMode ? "Выйти из полноэкранного режима" : "На весь экран"
      }
      portalContainer={
        isPlayerFullscreen ? playerContainerRef.current : undefined
      }
    >
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-label={
          isFullScreenMode
            ? "Switch to normal mode"
            : "Switch to full-screen mode"
        }
        className="cursor-pointer disabled:cursor-default"
      >
        {isFullScreenMode ? <RegularScreenIcon /> : <FullScreenIcon />}
      </button>
    </TooltipUI>
  );
}
