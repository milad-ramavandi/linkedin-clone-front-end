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
import React from "react";
import ChevronDown from "../chevron-down";

const UserProfile = () => {
  const session = useSession();
  const clickSignOut = () => signOut();
  return (
    <Dropdown>
      <DropdownTrigger className={"cursor-pointer"}>
        <div className="flex flex-col">
          <Avatar
            src={session.data?.user?.image as string}
            alt={session.data?.user?.name as string}
            className="w-6 h-6"
            showFallback
          />
          <div className={"flex items-center"}>
            <p className={"hidden sm:block sm:text-xs sm:text-gray-400"}>Me</p>
            <ChevronDown />
          </div>
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem className={"cursor-default"}>
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
        <DropdownItem>
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
