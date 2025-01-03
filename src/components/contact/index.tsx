"use client";
import { IContact } from "@/types/contact";
import { Avatar, Button, Spinner } from "@nextui-org/react";
import React, {useEffect, useState } from "react";
import CheckIcon from "../icons/check-icon";
import PlusIcon from "../icons/plus-icon";
import { useSession } from "next-auth/react";
import { handleFollowOrUnfollowAction } from "@/actions/contact";

const Contact = ({
  contact,
}: {
  contact: IContact;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [followed, setFollowed] = useState<boolean>(false);
  const session = useSession();
  useEffect(() => {
    if (contact?.followers?.includes(session.data?.user?.email as string)) {
      setFollowed(true);
    }
  }, [session.data?.user]);

  const handleFollowOrUnfollowClick = async () => {
    setIsLoading(true);
    await handleFollowOrUnfollowAction(session?.data?.user?.email as string, contact?._id)
    setIsLoading(false);
    setFollowed((prev) => !prev);
  };
  return (
    <div className="flex space-x-2">
      <Avatar
        src={contact.src}
        showFallback
        className={"hover:animate-pulse"}
        isBordered
      />
      <div className={"space-y-1"}>
        <p className="text-sm font-semibold">{contact.name}</p>
        <p className="text-xs text-gray-400">{contact.title}</p>
        <Button
          type="button"
          radius={"full"}
          size={"sm"}
          variant={"ghost"}
          onClick={handleFollowOrUnfollowClick}
          isDisabled={isLoading}
          startContent={ isLoading ? <Spinner size="sm" color={"default"}/> : followed ? <CheckIcon /> : <PlusIcon />}
        >
          {followed ? "Following" : "Follow"}
        </Button>
      </div>
    </div>
  );
};

export default Contact;
