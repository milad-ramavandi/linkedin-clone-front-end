"use client";

import { MouseEventHandler } from "react";
import FaceIcon from "../face-icon";
import ChevronDown from "../chevron-down";

const FaceChevronIcon = ({
  isToggleChevron,
  onClick,
}: {
  isToggleChevron?: boolean;
  onClick: MouseEventHandler;
}) => {
  return (
    <div className="flex items-center space-x-[1px] cursor-pointer" onClick={onClick}>
      <ChevronDown isOpenEmojiBox={isToggleChevron}/>
      <FaceIcon/>
    </div>
  );
};

export default FaceChevronIcon;
