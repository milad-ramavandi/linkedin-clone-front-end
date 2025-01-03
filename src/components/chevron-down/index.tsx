"use client";
import React from "react";

const ChevronDown = ({isOpenDropdown, isOpenEmojiBox, className}:{isOpenDropdown?:boolean,isOpenEmojiBox?:boolean, className?:string}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={`${className} stroke-gray-500 size-4 transition-all duration-200 ${isOpenDropdown || isOpenEmojiBox ? " rotate-180" : "rotate-0"}`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 8.25-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

export default ChevronDown;
