"use client";
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";
import React, { useState } from "react";
import ChevronDown from "../icons/chevron-down";

const UserProfile = () => {
  const session = useSession();
  const clickSignOut = () => signOut();
  const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false);
  const handleOpenDropdown = () => {
    setIsOpenDropdown((prev) => !prev);
  };
  return (
    <Dropdown>
      <DropdownTrigger
        className={"cursor-pointer"}
        onClick={handleOpenDropdown}
      >
        <div className="flex flex-col space-y-1">
          <Avatar
            src={session.data?.user?.image as string}
            alt={session.data?.user?.name as string}
            className="w-8 h-8 sm:w-5 sm:h-5"
            showFallback
            isBordered
          />
          <div className={"flex items-center"}>
            <p className={"hidden sm:block sm:text-xs sm:text-gray-400"}>Me</p>
            <ChevronDown isOpenDropdown={isOpenDropdown} className="hidden sm:block"/>
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem className={"cursor-default hover:!bg-transparent"}>
          <div className="flex space-x-3">
            <Avatar
              src={session.data?.user?.image as string}
              showFallback
              size={"lg"}
            />
            <div>
              <p className={"font-semibold text-medium"}>
                {session.data?.user?.name}
              </p>
              <p className={"text-gray-500"}>{session.data?.user?.email}</p>
            </div>
          </div>
        </DropdownItem>
        <DropdownItem className={"cursor-default"}>
          <Button
            variant={"light"}
            onClick={clickSignOut}
            className={"hover:underline text-medium"}
          >
            Sign out
          </Button>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserProfile;
