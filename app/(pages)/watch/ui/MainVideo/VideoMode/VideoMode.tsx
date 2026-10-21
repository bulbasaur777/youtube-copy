import VideoModeFullWidthIcon from "../../../icons/VideoModeFullWidthIcon";
import VideoModeNormalIcon from "../../../icons/VideoModeNormalIcon";
import TooltipUI from "../TooltipUI/TooltipUI";

type Props = {
  isFullWidthModeOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
};

export default function VideoMode({
  isFullWidthModeOn,
  onToggle,
  disabled = false,
}: Props) {
  return (
    <TooltipUI
      content={
        isFullWidthModeOn ? "Режим просмотра по умолчанию" : "Широкий экран"
      }
    >
      <button
        type="button"
        onClick={onToggle}
        disabled={disabled}
        aria-label={
          isFullWidthModeOn
            ? "Switch to normal mode"
            : "Switch to full-width mode"
        }
        className="hidden cursor-pointer items-center lg:flex disabled:cursor-default"
      >
        {isFullWidthModeOn ? (
          <VideoModeNormalIcon />
        ) : (
          <VideoModeFullWidthIcon />
        )}
      </button>
    </TooltipUI>
  );
}
