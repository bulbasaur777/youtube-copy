import SubtitlesOffIcon from "../../../icons/SubtitlesOffIcon";
import SubtitlesOnIcon from "../../../icons/SubtitlesOnIcon";
import { useVideo } from "@/contexts/VideoContext";
import TooltipUI from "../TooltipUI/TooltipUI";

type Props = {
  isSubtitlesOn: boolean;
  onToggle: () => void;
};

export default function SwitchSubtitles({ isSubtitlesOn, onToggle }: Props) {
  const { playerContainerRef, isFullScreenMode } = useVideo();

  return (
    <TooltipUI
      content={isSubtitlesOn ? "Отключить субтитры" : "Субтитры"}
      portalContainer={
        isFullScreenMode ? playerContainerRef.current : undefined
      }
    >
      <button
        type="button"
        onClick={onToggle}
        aria-label={isSubtitlesOn ? "Disable subtitles" : "Enable subtitles"}
        className="cursor-pointer"
      >
        {isSubtitlesOn ? <SubtitlesOffIcon /> : <SubtitlesOnIcon />}
      </button>
    </TooltipUI>
  );
}
