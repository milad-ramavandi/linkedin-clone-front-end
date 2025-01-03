"use client";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import React, { FocusEventHandler } from "react";
import SearchIcon from "../icons/search-icon";
import { searchItem } from "@/types/search";

const resultSearching: searchItem[] = [
  { title: "#hiring" },
  { title: "#jobadvice" },
  { title: "#covid-19" },
  { title: "#great resignation" },
];

const HeaderLeft = ({isShowOverlay, focusOverlayHandler, blurOverlayHandler}:{isShowOverlay:boolean, focusOverlayHandler:FocusEventHandler, blurOverlayHandler:FocusEventHandler}) => {
  return (
    <div className={"flex items-center sm:flex-grow space-x-2"}>
      <div className={"relative w-10 h-10"}>
        <Image
          src={"/assets/images/logo-header.png"}
          fill
          alt="logo"
          className={"object-cover rounded-lg"}
        />
      </div>
      <div
        className={
          "relative flex flex-grow max-w-[220px] md:max-w-[260px] lg:max-w-[300px] xl:max-w-[340px] transition-all duration-200 ease-in md:focus-within:max-w-[340px] lg:focus-within:max-w-[380px] xl:focus-within:max-w-[420px]"
        }
      >
        <Input
          type={"text"}
          startContent={<SearchIcon />}
          variant={"bordered"}
          color={"primary"}
          placeholder="Search Likedin..."
          onFocus={focusOverlayHandler}
          onBlur={blurOverlayHandler}
        />
        <div className={"hidden sm:block"}>
          {isShowOverlay && (
            <div
              className={
                "absolute top-full left-0 bg-slate-50 rounded-md w-[450px] space-y-2 overflow-hidden focus-visible"
              }
            >
              <p className={"text-sm font-semibold px-5 py-4 truncate"}>
                Try searching for
              </p>
              {resultSearching.map((item, index) => (
                <div
                  key={index}
                  className={"flex px-5 py-4 space-x-4 hover:bg-gray-300"}
                >
                  <SearchIcon />
                  <p className="font-bold truncate">{item.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderLeft;
