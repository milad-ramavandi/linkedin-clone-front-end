"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import React from "react";

const InformationIcon = () => {
  return (
    <Popover placement="left" shadow={'lg'}>
      <PopoverTrigger>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
          />
        </svg>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
         <p className="font-semibold">Follow things that interest you to personalize your feed.</p>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default InformationIcon;

{
}
