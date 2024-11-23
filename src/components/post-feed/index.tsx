"use client";
import { Post } from "@/types/post";
import { Avatar, Button } from "@nextui-org/react";
import TimeAgo from "react-timeago";
import React from "react";
import EllipsisVertical from "../ellipsis-vertical";
import Image from "next/image";
import PostOptions from "../post-options";
import { useSession } from "next-auth/react";
// import { useUser } from "@clerk/nextjs";

const PostFeed = (props: Post) => {
  // const user = useUser();
  const session = useSession()
  return (
    <div className="bg-white rounded-md border p-4 space-y-3">
      <div
        className={`flex items-center ${
          props.isEdited
            ? "justify-between"
            : 'justify-end'
        }`}
      >
        {props.isEdited && (
          <Button
            color={"default"}
            size={"sm"}
            radius="full"
            variant={"faded"}
            isDisabled
          >
            Edited
          </Button>
        )}

        {session.data?.user?.name === props.user.fullName && <EllipsisVertical {...props} />}
      </div>

      <div className="flex items-center space-x-2">
        <Avatar src={props.user.userImage} showFallback />
        <div className="text-xs text-gray-400">
          <p>{props.user.fullName}</p>
          <TimeAgo date={props.createdAt} suppressHydrationWarning />
        </div>
      </div>

      <p>{props.text}</p>
      {props.postImage && (
        <div className="relative w-full h-[300px] sm:h-[400px]">
          <Image
            src={props.postImage}
            alt={props.text}
            fill
            className="object-contain"
          />
        </div>
      )}
      <PostOptions post={props} />
    </div>
  );
};

export default PostFeed;
