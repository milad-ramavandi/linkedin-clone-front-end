"use client";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import React, { FocusEventHandler, MouseEventHandler, useState } from "react";
import SearchIcon from "../search-icon";
import Link from "next/link";
import HomeIcon from "../home-icon";
import UsersIcon from "../users-icon";
import BriefcaseIcon from "../briefcase-icon";
import MessagesIcon from "../messages-icon";
import OverleyEffect from "../overlay-effect";
import NotificationIcon from "../notification-icon";
import { searchItem } from "@/types/search";
import { LinkType } from "@/types/link/link";
import UserProfile from "../user-profile";

const links: LinkType[] = [
  { componentIcon: <HomeIcon />, title: "Home", active:true},
  {
    componentIcon: <UsersIcon />,
    title: "Network",
  },
  {
    componentIcon: <BriefcaseIcon />,
    title: "Jobs",
  },
  { componentIcon: <MessagesIcon />, title: "Messaging" },
  { componentIcon: <NotificationIcon />, title: "Notification" },
];

const resultSearching: searchItem[] = [
  { title: "#hiring" },
  { title: "#jobadvice" },
  { title: "#covid-19" },
  { title: "#great resignation" },
];

const Header = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [hideLinks, setHideLinks] = useState<boolean>(false);

  const focusOverlayHandler: FocusEventHandler = () => setShowOverlay(true);
  const blurOverlayHandler: FocusEventHandler = () => setShowOverlay(false);
  const clickLinksHandler: MouseEventHandler = () => {
    setHideLinks(true);
  };
  const blurLinksHandler: FocusEventHandler = () => setHideLinks(false);
  
  return (
    <>
      <header
        className={
          "p-2 border-b sticky top-0 z-40 bg-white overflow-auto scrollbar-hide sm:overflow-visible"
        }
      >
        <div className={"flex items-center max-w-screen-lg mx-auto space-x-2"}>
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
                "hidden sm:relative sm:flex flex-grow max-w-72 transition-all duration-200 ease-in focus-within:max-w-96"
              }
            >
              <Input
                type={"text"}
                startContent={<SearchIcon />}
                variant={"bordered"}
                color={"primary"}
                onFocus={focusOverlayHandler}
                onBlur={blurOverlayHandler}
              />
              <div className={"hidden sm:block"}>
                {showOverlay && (
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
            <div className={"sm:hidden"} onClick={clickLinksHandler}>
              {hideLinks ? (
                <div
                  className={
                    "flex flex-grow max-w-72 transition-all duration-200 ease-in focus-within:max-w-96"
                  }
                >
                  <Input
                    type={"text"}
                    startContent={<SearchIcon />}
                    variant={"bordered"}
                    color={"primary"}
                    onBlur={blurLinksHandler}
                    autoFocus
                  />
                </div>
              ) : (
                <SearchIcon />
              )}
            </div>
          </div>

          {!hideLinks && (
            <div className={"flex items-center space-x-4 pl-2"}>
              {links.map((item, index) => (
                <Link href={""} className={`icon`} key={index}>
                  <>{item.componentIcon}</>
                  <p title={item.title} className={`${item.active && '!text-blue-400'}`}>{item.title}</p>
                </Link>
              ))}
            </div>
          )}
          <UserProfile/>
        </div>
      </header>
      {showOverlay && <OverleyEffect />}
    </>
  );
};

export default Header;
