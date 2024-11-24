"use client";
import { IContact } from "@/types/contact";
import { Avatar, Button } from "@nextui-org/react";
import React, { MouseEventHandler, useEffect, useState } from "react";
import CheckIcon from "../check-icon";
import PlusIcon from "../plus-icon";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "react-query";
import { useSession } from "next-auth/react";

const Contact = ({ contact }: { contact: IContact }) => {
  const [followed, setFollowed] = useState<boolean>(false);
  const [followers] = useState<string[]>(
    contact.followers === undefined ? [] : contact.followers
  );

  const session = useSession();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [`${followed ? "Unfollowing" : "Following"}-contact`],
    mutationFn: () => {
      const promise = async () => {
        const followers =
          contact.followers === undefined ? [] : contact.followers;
        const newFollowers = !followed
          ? [...followers, session.data?.user?.name]
          : followers.filter((item) => item !== session.data?.user?.name);
        await fetch(`${process.env.AUTH_NEXT_URL}contacts/${contact.id}`, {
          method: "PUT",
          body: JSON.stringify({ ...contact, followers: newFollowers }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      };

      return toast.promise(promise, {
        pending: `${followed ? "Unfollowing" : "Following"} is pending...`,
        success: `${followed ? "Unfollowing" : "Following"} is successfully`,
        error: `Failed to ${followed ? "Unfollowing" : "Following"}`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries("contacts");
    },
  });

  useEffect(() => {
    if (followers.includes(session.data?.user?.name as string)) {
      setFollowed(true);
    }
  }, [session.data?.user]);

  const handleFollowOrUnfollowClick: MouseEventHandler = () => {
    mutate();
    setFollowed((prev) => !prev);
  };
  return (
    <div className="flex space-x-2">
      <Avatar src={contact.src} showFallback className={'hover:animate-pulse'}/>
      <div className={"space-y-1"}>
        <p className="text-sm font-semibold">{contact.name}</p>
        <p className="text-xs text-gray-400">{contact.title}</p>
        <Button
          type="button"
          radius={"full"}
          size={"sm"}
          variant={"ghost"}
          onClick={handleFollowOrUnfollowClick}
          startContent={followed ? <CheckIcon /> : <PlusIcon />}
        >
          {followed ? "Following" : "Follow"}
        </Button>
      </div>
    </div>
  );
};

export default Contact;
