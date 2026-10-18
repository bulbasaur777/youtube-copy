import { RefObject } from "react";
import MutedIcon from "../../../icons/MutedIcon";
import VolumeIcon from "../../../icons/VolumeIcon";

type Props = {
  isMuted: boolean;
  handleSwitchSound: () => void;
};

export default function Volume({ isMuted, handleSwitchSound }: Props) {
  function handleClick() {
    handleSwitchSound();
  }

  return (
    <div onClick={handleClick} className="cursor-pointer">
      {isMuted ? <MutedIcon /> : <VolumeIcon />}
    </div>
  );
}
