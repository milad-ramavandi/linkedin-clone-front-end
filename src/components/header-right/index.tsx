"use  client";
import { LinkType } from "@/types/link/link";
import Link from "next/link";
import HomeIcon from "../icons/home-icon";
import UsersIcon from "../icons/users-icon";
import BriefcaseIcon from "../icons/briefcase-icon";
import MessagesIcon from "../icons/messages-icon";
import NotificationIcon from "../icons/notification-icon";
import UserProfile from "../user-profile";
import React from "react";

const links: LinkType[] = [
  { componentIcon: <HomeIcon />, title: "Home", active: true },
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

const HeaderRight = () => {
  return (
    <div className="flex space-x-2">
      <div
        className={
          "w-[90%] h-[60px] !mx-auto fixed left-0 right-0 bottom-1 px-4 py-2 rounded-lg bg-gray-500 flex justify-between items-center space-x-4 sm:static sm:h-auto sm:bg-transparent sm:p-0"
        }
      >
        {links.map((item, index) => (
          <Link href={""} className={`icon`} key={index}>
            {item.componentIcon}
            <p
              title={item.title}
              className={`${item.active && "!text-blue-400"}`}
            >
              {item.title}
            </p>
          </Link>
        ))}
      </div>
      <UserProfile />
    </div>
  );
};

export default HeaderRight;
